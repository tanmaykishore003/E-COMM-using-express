import express from 'express';
import CartItemController from './cartItems.controller.js';
import { upload } from '../../middlewares/fileUpload.middleware.js';

const cartController = new CartItemController();
const router = express.Router();

router.post('/', cartController.addItem);
router.get('/', cartController.getItem);
router.delete('/:id', cartController.deleteCartItem);

export default router;