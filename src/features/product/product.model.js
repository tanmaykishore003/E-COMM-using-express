
import UserModel from "../user/user.model.js"


export default class ProductModel {
    constructor(id, name, desc, price, imageUrl, category, sizes) {
        this.id = id,
        this.name = name,
        this.desc = desc,
        this.price = price,
        this.imageUrl = imageUrl,
        this.category = category,
        this.sizes = sizes
    }

    static getAll() {
        return products;
    }

    static getSingleProduct(id) {
        const product = products.find(item => item.id == id);
        return product
    }

    static filter(minPrice, maxPrice, category) {
        const result = products.filter((product) =>{
            return (
                (!maxPrice || product.price <= maxPrice) && 
                (!minPrice || product.price >= minPrice) && 
                (!category || product.category == category)
            )
        })
        return result
    }

    static add(product) {
        product.id = products.length + 1;
        products.push(product)
        return product
    }

    static rateProduct(userId, productId, rating) {
        // 1. Validate user and product
        const user = UserModel.getUsers().find(u => u.id == userId)
        if(!user) {
            return 'User not found';
        }

        const product = products.find(p => p.id == productId)
        if(!product) {
            return 'Product not found'
        }

        if(!product.ratings) {
            product.ratings = [];
            product.ratings.push({
                userID: userId,
                rating: rating
            })
        }
        else {
            // check if user rating is already available
            const existingRating = product.ratings.findIndex(r => r.userID == userId)
            console.log(existingRating);
            if(existingRating >= 0) {
                product.ratings[existingRating] = {
                    userID: userId,
                    rating: rating
                }
            }else {
                product.ratings.push({
                    userID: userId,
                    rating: rating
                })
            }

        }
    }
}

let products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 10',
        19.99,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Category1'
    ),
    new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        29.99,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'Category2',
        ['M', 'XL']
    ),
    new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Category3',
        ['M', 'XL', 'S']
    ),
  ];
  