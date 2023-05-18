import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://franky64:1MCwJWehmJsdRQpz@cluster0.b5xnt2y.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("vimato-test");

export default db;