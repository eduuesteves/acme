import sqlite3 from "sqlite3";
import path from "path";

export const db = new sqlite3.Database(
  path.resolve(__dirname, "database.sqlite"),
  (err) => {
    if (err) console.error(err.message);
    else console.log("SQLite conectado");
  }
);
