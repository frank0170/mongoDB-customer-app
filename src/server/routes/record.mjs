import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import crypto from "crypto";

const router = express.Router();

router.get("/", async (req, res) => {
  const collectionName = "Sheet1";
  let collection = await db.collection(collectionName);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  const collectionName = "Sheet1";
  let collection = await db.collection(collectionName);
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  let newDocument = {
    nume: req.body.nume,
    telefon: req.body.telefon,
    Adresa: req.body.Adresa,
    Data: req.body.Data,
    Lucrare: req.body.Lucrare,
  };
  const collectionName = "Sheet1";
  let collection = await db.collection(collectionName);
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      nume: req.body.nume,
      telefon: req.body.telefon,
      Adresa: req.body.Adresa,
      Data: req.body.Data,
      Lucrare: req.body.Lucrare,
    },
  };
  const collectionName = "Sheet1";
  let collection = await db.collection(collectionName);
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

router.get("/search/:id", async (req, res) => {
  const collectionName = "Sheet1";
  let collection = await db.collection(collectionName);
  let query = { nume: { $regex: req.params.id, $options: "i" } };
  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
  const collectionName = "Sheet1";
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection(collectionName);
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const collectionName = "Users";
  const collection = await db.collection(collectionName);

  try {
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    const newUser = {
      email,
      password: hashedPassword,
      isAdmin: false,
    };

    await collection.insertOne(newUser);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login-verify", async (req, res) => {
  const { email, password } = req.body;
  const collectionName = "Users";
  let collection = await db.collection(collectionName);

  const user = await collection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  if (hashedPassword !== user.password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.send(true);
});

export default router;
