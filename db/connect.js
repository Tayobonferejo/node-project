// server.js
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables

// Get connection string from environment variable
const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  console.error('❌ MONGODB_URI not found in .env file!');
  process.exit(1);
}

const client = new MongoClient(connectionString);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB!");

    const database = client.db("myDatabase");
    const collection = database.collection("users");

    // Insert a document
    const doc = { name: "John", age: 30, email: "john@example.com" };
    const result = await collection.insertOne(doc);
    console.log(`📝 Document inserted with _id: ${result.insertedId}`);

    // Query documents
    const user = await collection.findOne({ name: "John" });
    console.log("👤 Found user:", user);

  } catch (err) {
    console.error("❌ Connection error:", err.message);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

run();