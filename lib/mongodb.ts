import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI + "";

let client = new MongoClient(uri);
let clientPromise = client.connect();

export default clientPromise;
