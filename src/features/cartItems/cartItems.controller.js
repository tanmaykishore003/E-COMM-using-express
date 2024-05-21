import CartItemModel from '../cartItems/cartItems.model.js'
import CartItemRepository from './cartItems.repository.js';

export default class CartItemController{
    constructor() {
        this.cartItemRepository = new CartItemRepository()
    }

    async addItem(req, res) {

        const { productID, quantity } = req.body;
        const userID = req.userID;
        const item = new CartItemModel(
            productID,
            userID,
            quantity
        )

        await this.cartItemRepository.addToCartItem(item) 
        return res.status(201).send('Cart is updated.')
    }

    async getItem(req, res) {
        const userID = req.userID

        const items = await this.cartItemRepository.getCartItem(userID);
        return res.status(200).send(items)
    }

    async deleteCartItem(req, res) {
        const userID = req.userID;
        const cartItemId = req.params.id;
        const deletedItem = await this.cartItemRepository.deleteCartItem(cartItemId, userID);

        return res.status(200).send(deletedItem)

    }
}