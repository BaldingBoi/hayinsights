import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI + "";

const getDB = async () => {
    let client = new MongoClient(uri);
    await client.connect();
    return client.db(process.env.MONGODB_NAME + "");
};

export default getDB;
