import express from 'express';
import CartItemController from './cartItems.controller.js';
import { upload } from '../../middlewares/fileUpload.middleware.js';

const cartController = new CartItemController();
const router = express.Router();

router.post('/', (req, res) => {
    cartController.addItem(req, res)
});
router.get('/', (req, res) => {
    cartController.getItem(req, res)
});
router.delete('/:id', (req, res) => {
    cartController.deleteCartItem(req, res)
});

export default router;