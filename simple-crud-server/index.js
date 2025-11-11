const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection URI
const uri = "mongodb+srv://borat156006_db_user:fMzQNQcyg1sQ5VTR@cluster0.i8wpz9p.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=Cluster0";


// ✅ MongoClient সেটআপ
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ✅ MongoDB Connection
async function run() {
  try {
    await client.connect();
    const database = client.db("simpleCardDB"); // তোমার database নাম দাও
    const userCollection = database.collection("users"); // collection নাম দাও

    // ✅ GET API
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find();
      const users = await cursor.toArray();
      res.send(users);
    });

    // ✅ POST API
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // ✅ Root route
    app.get('/', (req, res) => {
      res.send('SIMPLE CRUD SERVER IS RUNNING ✅');
    });

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
}

run().catch(console.dir);

// ✅ Server listen
app.listen(port, () => {
  console.log(`🚀 SIMPLE CRUD IS RUNNING ON PORT: ${port}`);
});
