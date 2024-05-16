import express from 'express'
import ProductController from './product.controller.js'
import { upload } from '../../middlewares/fileUpload.middleware.js';

const productController = new ProductController();
const router = express.Router();

router.post('/rate', (req, res, next) => {
    productController.rateProduct(req, res, next)
})
router.get('/filter', (req, res) => {
    productController.filterProduct(req, res, next)
})
router.get(
    '/',
    (req, res) => {
        productController.getAllProducts(req, res)
    }
)

router.post('/',
    upload.single('imageUrl'),
    (req, res) => {
        productController.addProduct(req, res)
    }
)

router.get('/:id',
    (req, res) => {
        productController.getOneProduct(req, res)
    }
)

export default router;