import express from 'express'
import UserController from './user.controller.js';

const userController = new UserController();
const router = express.Router();

router.post('/signUp', (req, res) => {
    userController.signUp(req, res)
})
router.post('/signIn', (req, res) => {
    userController.signIn(req, res)
})
router.get('/', userController.getUser)

export default router;