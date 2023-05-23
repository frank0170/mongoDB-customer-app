import { MongoClient } from "mongodb";

const connectionString = "mongo-db-server";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("mongo-db");

export default db;
