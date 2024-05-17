import ProductModel from "../product/product.model.js";
import UserModel from "../user/user.model.js";

export default class CartItemModel {
    constructor(productID, userID, quantity, id) {
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this._id = id;
    }

    static addItemToCart(productId, userId, quantity) {
        const isValidProduct = ProductModel.getAll().find(p => p.id == productId);
        if(!isValidProduct) {
            return "Product does not exist"
        }

        const isValidUser = UserModel.getUsers().find(u => u.id == userId);
        if(!isValidUser) {
            return "User is invalid"
        }

        // Implementation of update is not done
        
        const cartItem = new CartItemModel(productId, userId, quantity);
        cartItem.id = cartItems.length + 1;
        cartItems.push(cartItem);
        return cartItem;
    }

    static getCartItems (userId) {
        const validUser = cartItems.filter(u => u.userId == userId);
        return validUser
    }

    static delete(cartItemId, userId) {
        const validUser = UserModel.getUsers().find(u => u.userId == userId)

        const cartItemIndex = cartItems.findIndex(c => c.id == cartItemId && c.userId == userId);
        if(cartItemIndex == -1) {
            return 'Product not found in the cart'
        }
        else {
            cartItems.splice(cartItemIndex, 1);
        }
        
    }
} 

let cartItems = [
    new CartItemModel(1, 1, 1, 1),
    new CartItemModel(2, 1, 2, 4)
]