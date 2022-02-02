import { MongoClient } from 'mongodb';

const username = process.env.mongodb_username;
const password = process.env.mongodb_password;
const clustername = process.env.mongodb_clustername;
const database = process.env.mongodb_database;

const connectionString = `mongodb+srv://${username}:${password}@${clustername}.xkrx3.mongodb.net/${database}?retryWrites=true&w=majority`;
export async function connect_db() {
  /*  we want swap out some of these values in url for 
    dynamic values which can differ between development and production .  
    so that we can have a development database connection and a production db. 
    */    
  const client = new MongoClient(connectionString);
  await client.connect();
  return client; 
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const mycollection = db.collection(collection);
  await mycollection.insertOne(document);
}

export async function getData(client, collection, filter_id) {
  const db = client.db();
  const mycollection = db.collection(collection);
  const data = mycollection.find().sort({ _id: -1 }).toArray();
  const filteredData = data.find((element) => element._id === filter_id);
  return filteredData;
}
