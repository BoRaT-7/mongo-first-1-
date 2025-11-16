const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// MongoDB URI
const uri = "mongodb+srv://borat156006_db_user:fMzQNQcyg1sQ5VTR@cluster0.i8wpz9p.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("simpleCardDB").collection("users");

    // GET API
    app.get('/users', async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // POST API
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get('/', (req, res) => {
      res.send("SERVER IS RUNNING ✔");
    });

    console.log("MongoDB Connected ✔");
  } catch (error) {
    console.log(error);
  }
}

run();

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`);
});
