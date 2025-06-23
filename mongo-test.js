require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await client.db().admin().ping();
    console.log('Ping result:', result);
    console.log('Successfully connected to MongoDB!');
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await client.close();
  }
}

main();