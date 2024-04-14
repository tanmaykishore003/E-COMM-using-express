import ProductModel from "./product.model.js";

export default class ProductController {

    getAllProducts(req, res) {
        const product = ProductModel.getAll();
        res.status(200).send(product)
    }

    addProduct(req, res) {
        const {name, price, sizes} = req.body
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.filename,
        }
        const product = ProductModel.add(newProduct)
        res.status(201).send(product)
    }

    rateProduct(req, res, next) {
        try {
            const userId = req.query.userId;
            const productId = req.query.productId
            const rating = req.query.rating

            ProductModel.rateProduct(
                userId,
                productId,
                rating
            )
            return res.status(200).send('Ratings has been added')
        }
        catch(err) {
            next(err)
        }
    }

    getOneProduct(req, res) {
        const id = req.params.id;
        let product = ProductModel.getSingleProduct(id)
        if(!product) {
            res.status(404).send('Product not found.')
        }
        else {
            return res.status(200).send(product)
        }
    }

    filterProduct(req, res) {
        const minPrice = req.query.minPrice
        const maxPrice = req.query.maxPrice
        const category = req.query.category
        const result = ProductModel.filter(minPrice, maxPrice, category)
        res.status(200).send(result);
    }
}