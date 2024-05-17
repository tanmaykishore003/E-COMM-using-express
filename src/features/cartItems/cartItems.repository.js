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

            const { productID, userID, quantity } = {...newItem}
            await collection.insertOne({productID: new ObjectId(productID), userID: new ObjectId(userID), quantity})
            return newItem
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

    async deleteCartItem(cartItemID, userID) {
        try {
            const db = getDB()
            const collection = db.collection(this.collectionName)

            const deletedItem = await collection.deleteOne({_id: new ObjectId(cartItemID), userID: new ObjectId(userID)})
            return deletedItem
        }
        catch (err) {
            console.log(err);
        }
    }

}