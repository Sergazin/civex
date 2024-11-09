// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved.
// ==================================================================================

import mongoose, { type Connection } from "mongoose";

export default async function init_db(): Promise<Connection> {
  return new Promise((resolve, reject) => {
    // ####### DB ##########
    let db = mongoose.connection;
    db.on("connected", function () {
      resolve(db);
    });

    db.on("error", function (error) {
      reject(error);
    });

    const connect_string = process.env.DB_CONNECT_STRING;
    if (!connect_string) throw new Error("DB_CONNECT_STRING not found in .env");

    mongoose.connect(connect_string, {}); // монго соединение с авторизацией
  });
}
