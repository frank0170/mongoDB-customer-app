import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://franky64:bQ3Kmea9Lv7iBaoi@cluster0.b5xnt2y.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("Test1");

export default db;