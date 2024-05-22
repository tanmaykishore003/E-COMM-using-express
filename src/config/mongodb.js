
import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = () => {
    MongoClient.connect(process.env.DB_URL)
        .then(clientInstance => {
            client = clientInstance
            console.log("MongoDB is connected");
            createCounter(client.db())
            createIndexes(client.db())
        })
        .catch(err => {
            console.log(err);
        });
};

export const getDB = () => {
    return client.db()
}

const createCounter = async (db) => {
    try {
        const existingCounter = await db.collection("counters").findOne({ _id: 'cartItemId' })
        if (!existingCounter) {
            await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
        }
    }
    catch (err) {
        console.log(err);
    }
}

const createIndexes = async (db) => {
    try {
        await db.collection("products").createIndex({ price: 1 })
    }
    catch (err) {
        console.log(err);
    }
    console.log("Indexes are created");
}