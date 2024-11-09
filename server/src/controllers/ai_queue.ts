// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import OpenAI from "openai";
import type { Document } from "@langchain/core/documents";
import * as T from "../ts_server";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { AiTaskRawModel, CvRawModel } from "../ts_server/models";
import axios from "axios";
import { v4 } from "uuid";
import { z } from "zod";

if (!process.env.PINECONE_API_KEY) throw new Error("PINECONE_API_KEY is not set");
if (!process.env.PINECONE_INDEX) throw new Error("PINECONE_INDEX is not set");
if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const extraction_zod_schema = z.object({
  name: z.string(),
  surname: z.string(),
  position: z.string(),
});

const pinecone = new Pinecone();
const pinecone_index = pinecone.Index(process.env.PINECONE_INDEX!);

if (!pinecone_index) throw new Error("PINECONE_INDEX is not set");
export const vector_store = await PineconeStore.fromExistingIndex(embeddings, {
  // TODO: WTF with types
  pineconeIndex: pinecone_index! as any,
  // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
  maxConcurrency: 5,
});

export async function tester() {
  const document1: Document = {
    pageContent: "The powerhouse of the cell is the mitochondria",
    metadata: {},
  };

  const document2: Document = {
    pageContent: "Buildings are made out of brick",
    metadata: {},
  };

  const document3: Document = {
    pageContent: "Mitochondria are made out of lipids",
    metadata: {},
  };

  const document4: Document = {
    pageContent: "The 2024 Olympics are in Paris",
    metadata: {},
  };

  const documents = [document1, document2, document3, document4];

  console.log("Adding documents to vector store");
  try {
    await vector_store.addDocuments(documents, { ids: ["1", "2", "3", "4"] });
  } catch (e) {
    console.error(e);
  }

  console.log("Searching for similar documents");
  const filter = {};

  const similaritySearchResults = await vector_store.similaritySearch("biology", 10, filter);

  for (const doc of similaritySearchResults) {
    console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
  }
}

let ai_queue_running = false;

export async function run_ai_queue() {
  console.log("Running AI queue");
  if (ai_queue_running) return;
  const found_tasks = await AiTaskRawModel.find({ "status.name": T.AiTaskStatusEnum.Created });
  if (!found_tasks.length) {
    console.log("No tasks found");
    ai_queue_running = false;
    return;
  }

  for (const task of found_tasks) {
    try {
      task.status = { name: T.AiTaskStatusEnum.InProgress };
      await task.save();
      console.log("Running task", task.uuid);
      // Step 1 - Save local copy of file by url
      const pdf_url = task.pdf_url;
      console.log("PDF URL", task.pdf_url);
      const resp = await axios.get(pdf_url, { responseType: "arraybuffer" });
      const buffer = Buffer.from(resp.data);
      const raw_text = await extract_text_from_pdf(buffer);
      console.log("RAW", raw_text);
      const base_prompt =
        "Here is text from CV. Extract data as json {name,surname,position}. Output should be json only, without chars like ```json, etc.\n";
      /*
      const base_prompt =
        "Here is text from CV. Text may contain unnecessary data, that not valuable to find candidates. Extract only valuable text as extracted_text (should be string). Make proper text structure. Extract data as json {name,surname,position, extracted_text}. Output should be json only, without chars like ```json, etc.\n```";
      * **/
      const params: OpenAI.Chat.ChatCompletionCreateParams = {
        messages: [
          {
            role: "user",
            content: base_prompt + "```" + raw_text + "```",
          },
        ],
        model: "gpt-3.5-turbo",
      };
      const completion: OpenAI.Chat.ChatCompletion = await openai_client.chat.completions.create(params);
      const answer = completion.choices[0].message.content;
      if (!answer) {
        continue;
      }
      const json_data: {
        name: string;
        surname: string;
        position: string;
      } = JSON.parse(answer);
      extraction_zod_schema.parse(json_data);

      const cv_data: T.CvRaw = {
        uuid: v4(),
        ai_task_uuid: task.uuid,
        creator_uuid: task.creator_uuid,
        pdf_url: task.pdf_url,
        no: task.no,
        created_at: Date.now(),
        extracted_text: raw_text,
        ...json_data,
      };

      const cv = await CvRawModel.create(cv_data);

      await vector_store.addDocuments(
        [
          {
            pageContent: raw_text,
            metadata: {},
          },
        ],
        { ids: [cv.uuid] },
      );

      // Step 2 - extract text from documents
      task.status = { name: T.AiTaskStatusEnum.Completed };
      await task.save();
    } catch (e) {
      task.status = { name: T.AiTaskStatusEnum.Failed };
      await task.save();
      console.log(e);
    }
  }
  ai_queue_running = false;
}

const openai_client = new OpenAI();

// @ts-ignore
const pdf_parse = require("pdf-parse");
export async function extract_text_from_pdf(pdf_file: Buffer) {
  const data = await pdf_parse(pdf_file);
  return data.text;
}
