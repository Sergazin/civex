// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================
import { Controller } from "./controllers";
import { run_ai_queue } from "./controllers/ai_queue";
import init_db from "./inits/db";
import { router, start_server } from "./inits/web_server";
import { apply_routes } from "./ts_server";

async function main() {
  await init_db();
  console.log("DB initialized");
  apply_routes(router, new Controller());
  await start_server();
  await run_ai_queue();
}

main();
