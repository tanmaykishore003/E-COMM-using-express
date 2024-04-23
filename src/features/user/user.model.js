import { ApplicationError } from "../../Error-Handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

export default class UserModel{
    constructor(name, email, password, type, id) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type
    }

     static async signUp(name, email, password, type) {

        try {
            // 1. Get the database
            const db = getDB()
            // 2. Get the collection
            const collection = db.collection("users")

            const newUser = new UserModel(
                name, 
                email,
                password,
                type
            )

            // 3. Insert the document
            await collection.insertOne(newUser)
            return newUser
        }
        catch(err) {
            throw new ApplicationError('Something went wrong', 500)
        }
    }

    static signIn(email, password) {
        const user = users.find(u => u.email == email && u.password == password)
        return user
    }

    static getUsers() {
        return users
    }
}

let users = [
    {
        "id": "1",
        "name": "Seller User",
        "email": "admin@ecom.com",
        "password": "password1",
        "type": "seller"
    },
    {
        "id": "2",
        "name": "Customer User",
        "email": "customer@ecom.com",
        "password": "password1",
        "type": "seller"
    }
]