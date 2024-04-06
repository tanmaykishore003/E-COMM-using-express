import express from 'express'
import UserController from './user.controller.js';

const userController = new UserController();
const router = express.Router();

router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.get('/', userController.getUser)

export default router;