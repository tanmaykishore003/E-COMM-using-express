
import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../Error-Handler/applicationError.js";

class ProductRepository {

    constructor() {
        this.collection = 'products'
    }

    async add(newProduct) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection);

            await collection.insertOne(newProduct)
            return newProduct
        }
        catch(err) {
            throw new ApplicationError('Somethong went wrong with database', 500)
        }
    }

    async getAll() {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)

            return await collection.find().toArray();
        }
        catch(err) {
            throw new ApplicationError('Somethong went wrong with database', 500)
        }
    }

    async get(id) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)

            return await collection.findOne({ _id: new ObjectId(id)})
        }
        catch(err) {
            throw new ApplicationError('Somethong went wrong with database', 500)
        }
    }

    async filter(minPrice, maxPrice, category) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)

            let filterExpression = {}
            if(minPrice) {
                filterExpression.price = {...filterExpression.price, $gte: parseFloat(minPrice)}
            }
            if(maxPrice) {
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if(category) {
                filterExpression.category = category
            }
            return await collection.find(filterExpression).toArray()
        }
        catch(err) {
            throw new ApplicationError('Something went wrong with database', 500)
        }
    }

    async rate(userID, productID, rating) {
        try {
            const db = getDB()
            const collection = db.collection(this.collection)

            collection.updateOne({
                _id: new ObjectId(productID)
            }, {
                $push: {ratings: {userID: new ObjectId(userID), rating}}
            })
        }
        catch(err) {
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500)
        }
    }
}

export default ProductRepository;