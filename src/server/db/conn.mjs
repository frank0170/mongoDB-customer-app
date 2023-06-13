import { MongoClient } from "mongodb";

<<<<<<< Updated upstream
const connectionString = "mongodb+srv://franky64:1MCwJWehmJsdRQpz@cluster0.b5xnt2y.mongodb.net/?retryWrites=true&w=majority";
=======
const connectionString = "mongodb+srv://";
>>>>>>> Stashed changes

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

<<<<<<< Updated upstream
let db = conn.db("vimato-test");
=======
let db = conn.db("Test1");
>>>>>>> Stashed changes

export default db;