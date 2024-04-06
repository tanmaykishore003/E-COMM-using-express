
import UserModel from "./user.model.js"
import jwt from "jsonwebtoken"

export default class UserController {

    signUp(req, res) {
        const {name, email, password, type} = req.body
        const user = UserModel.signUp(name, email, password, type)
        res.status(201).send(user)
    }

    signIn(req, res) {
        const {email, password} = req.body;
        const result = UserModel.signIn(email, password);
        if(!result) {
            return res.status(400).send("Incorrect Credentials!")
        }
        // 1. Create token
        const token = jwt.sign({
            userId: result.id,
            email: result.email
        }, "jmRdCxf834yOjYVbDkOjhAgyk23b9eek", {
            expiresIn: '1h'
        })

        // 2. Send token
        return res.status(200).send(token)
    }

    getUser(req, res) {
        return res.send(UserModel.getUsers())
    }
}