
import { ApplicationError } from "../../Error-Handler/applicationError.js"
import UserModel from "./user.model.js"
import jwt from "jsonwebtoken"
import UserRepository from "./user.repository.js"
import bcrypt from 'bcrypt'

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository()
    }

    async signUp(req, res) {
        try {
            const { name, email, password, type } = req.body
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new UserModel(
                name,
                email,
                hashedPassword,
                type
            )
            await this.userRepository.signUp(user)
            res.status(201).send(user)
        }
        catch (err) {
            throw new ApplicationError('Something went wrong', 500)
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).send("Incorrect Credentials!")
            }
            else {
                const result = await bcrypt.compare(password, user.password);

                if (result) {
                    // 1. Create token
                    const token = jwt.sign({
                        userID: user._id,
                        email: user.email
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1h'
                    })
                    // 2. Send token
                    return res.status(200).send(token)
                }
                else {
                    return res.status(400).send("Incorrect Credentials!")
                }
            }
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong', 500)
        }

    }

    getUser(req, res) {
        return res.send(UserModel.getUsers())
    }
}