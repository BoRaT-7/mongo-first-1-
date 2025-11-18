const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = "mongodb+srv://borat156006_db_user:fMzQNQcyg1sQ5VTR@cluster0.i8wpz9p.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: false,
  },
});

async function run() {
  try {
    const userCollection = client.db("simpleCardDB").collection("users");

    // 🔹 GET users
    app.get('/users', async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // 🔹 POST user
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get('/', (req, res) => {
      res.send("SERVER IS RUNNING");
    });

    console.log("Server Ready ✔");

  } catch (error) {
    console.log("Mongo Error ❌", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`);
});
