import CartItemModel from '../cartItems/cartItems.model.js'

export default class CartItemController{

    addItem(req, res) {
        const { productId, quantity } = req.query;
        const userId = req.userId;
        const item = CartItemModel.addItemToCart(productId, userId, quantity)
        return res.status(201).send('Cart is updated.')
    }

    getItem(req, res) {
        const userId = req.userId
        const items = CartItemModel.getCartItems(userId);
        return res.status(200).send(items)
    }

    deleteCartItem(req, res) {
        const userId = req.userId;
        const cartItemId = req.params.id;
        const err = CartItemModel.delete(cartItemId, userId);
        console.log(err);
        if(err) {
            return res.status(404).send(err)
        }
        return res.status(200).send('Item deleted succesfully')

    }
}