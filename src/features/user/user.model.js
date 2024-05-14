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