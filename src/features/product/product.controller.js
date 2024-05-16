import { ApplicationError } from "../../Error-Handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {

    constructor() {
        this.productRepository = new ProductRepository()
    }

    async getAllProducts(req, res) {
        try {
            const product = await this.productRepository.getAll();
            res.status(200).send(product)
        }
        catch (err) {
            throw new ApplicationError('Something went wrong', 500)
        }
    }

    async addProduct(req, res) {
        try {
            const { name, price, sizes } = req.body

            const newProduct = new ProductModel(
                name,
                null,
                parseFloat(price),
                req.file.filename,
                null,
                sizes.split(','),

            )
            const product = await this.productRepository.add(newProduct)
            res.status(201).send(product)
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong', 500)
        }
    }

    async rateProduct(req, res, next) {
        try {
            const userID = req.userID;
            console.log(req.userID);
            const productID = req.query.productID
            const rating = req.query.rating

            await this.productRepository.rate(userID, productID, rating)
            return res.status(200).send('Ratings has been added')
        }
        catch (err) {
            next(err)
        }
    }

    async getOneProduct(req, res) {
        try {
            const id = req.params.id;
            let product = await this.productRepository.get(id)
            if (!product) {
                res.status(404).send('Product not found.')
            }
            else {
                return res.status(200).send(product)
            }
        }
        catch (err) {
            throw new ApplicationError('Something went wrong', 500)
        }
    }

    async filterProduct(req, res) {
        try {
            const minPrice = req.query.minPrice
            const maxPrice = req.query.maxPrice
            const category = req.query.category
            const result = await this.productRepository.filter(minPrice, maxPrice, category)
            res.status(200).send(result);
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong', 500)
        }
    }
}