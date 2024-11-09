// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
//import "@aws-sdk/signature-v4-crt";
import { v4 } from "uuid";
import * as T from "../ts_server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

if (!process.env.S3_SECRET_KEY) throw new Error("S3_SECRET_KEY is not set");
if (!process.env.S3_ACCESS_KEY) throw new Error("S3_ACCESS_KEY is not set");
if (!process.env.S3_ENDPOINT) throw new Error("S3_ENDPOINT is not set");
if (!process.env.S3_ORIGIN_URL) throw new Error("S3_ORIGIN_URL is not set");
if (!process.env.S3_BUCKET_NAME) throw new Error("S3_BUCKET_NAME is not set");
if (!process.env.S3_REGION) throw new Error("S3_REGION is not set");
if (!process.env.S3_DIRECTORY) throw new Error("S3_DIRECTORY is not set");

const config = {
  bucket: process.env.S3_BUCKET_NAME,
  endpoint: process.env.S3_ENDPOINT,
  directory: process.env.S3_DIRECTORY,
  //forcePathStyle: false,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
};
const s3Client = new S3Client(config);

export async function upload(auth_claims: T.AuthClaims, body: T.UploadRequest): Promise<T.UploadResult> {
  const random_name = v4();
  const file_ext = body.name.split(".").pop();
  const file_name = random_name + "." + file_ext;
  //const Key = `${file_name}`;
  const Key = `${config.directory}/${auth_claims.user_uuid}/${file_name}`;

  try {
    const command = new PutObjectCommand({
      Bucket: config.bucket,
      Key,
      Body: Buffer.from(body.file, "base64"),
      ContentType: body.type,
      //BucketKeyEnabled: false,
      ACL: "public-read",
      //ACL: "public",
    });

    await s3Client.send(command);
    return { url: process.env.S3_ORIGIN_URL + "/" + Key };
  } catch (e) {
    console.log(e);
    throw e;
    /* handle error */
  }
}
