import express from 'express';
import productRouter from './src/features/product/product.routes.js'
import userRouter from './src/features/user/user.routes.js'
import cartRouter from './src/features/cartItems/cartItems.routes.js'
import bodyParser from 'body-parser';
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';


const app =  express();
const PORT = 8080;

app.use(bodyParser.json())

// app.use(express.static('public'));
app.use('/api/products',jwtAuth, productRouter)
app.use('/api/cartItems', jwtAuth, cartRouter)
app.use('/api/users', userRouter)
app.get('/', (req, res) => {
    res.send('Welcome to Ecommerce APIs.')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port no ${PORT}`);
})