import { ObjectId } from "mongodb"
import { getDB } from "../../config/mongodb.js"


export default class CartItemRepository {
    constructor() {
        this.collectionName = 'cart'
    }

    async addToCartItem(newItem) {
        try {
            const db = getDB()
            const collection = db.collection(this.collectionName)
            const id = await this.getNextCounter(db)
            console.log(id);

            const { productID, userID, quantity } = {...newItem}
            // await collection.insertOne({productID: new ObjectId(productID), userID: new ObjectId(userID), quantity})

            // Below method can create and update the cart at same time
            await collection.updateOne(
                {productID:new ObjectId(productID), userID:new ObjectId(userID)},
                {
                    $setOnInsert: {_id:id},
                    $inc:{
                    quantity: quantity
                }},
                {upsert: true}
            ) 
        }
        catch (err) {
            console.log(err);
        }
    }

    async getCartItem(userID) {
        try {
            const db = getDB()
            const collection = db.collection(this.collectionName)

            const items = await collection.find({ userID: new ObjectId(userID) }).toArray()
            return items
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteCartItem(cartItemId, userID) {
        try {
            const db = getDB()
            const collection = db.collection(this.collectionName)

            const deletedItem = await collection.deleteOne({_id: new ObjectId(cartItemId), userID: new ObjectId(userID)})
            return deletedItem
        }
        catch (err) {
            console.log(err);
        }
    }


    async getNextCounter(db) {
        const resultDocument = await db.collection('counters').findOneAndUpdate(
            {_id: 'cartItemId'},
            {$inc: {value: 1}},
            {returnDocument: 'after'}
        )
        console.log(resultDocument);
        console.log(resultDocument.value);
        return resultDocument.value
    }

}