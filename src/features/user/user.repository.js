import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../Error-Handler/applicationError.js"

class UserRepository {

    async signUp(newUser) {

        try {
            // 1. Get the database
            const db = getDB()
            // 2. Get the collection
            const collection = db.collection("users")

            // 3. Insert the document
            await collection.insertOne(newUser)
            return newUser
        }
        catch(err) {
            throw new ApplicationError('Something went wrong with database', 500)
        }
    }

    async signIn(email, password) {
        try {
            const db = getDB()
            const collection = db.collection("users")

            return await collection.findOne({email, password})
        }
        catch(err) {
            throw new ApplicationError('Something went wrong with database', 500)
        }
    }
}

export default UserRepository