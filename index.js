// Third Party imports
import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type: 'json'}
import cors from 'cors'

// Internal imports
import productRouter from './src/features/product/product.routes.js'
import userRouter from './src/features/user/user.routes.js'
import cartRouter from './src/features/cartItems/cartItems.routes.js'
import bodyParser from 'body-parser';
// import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { logger } from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/Error-Handler/applicationError.js';
import { connectToMongoDB } from './src/config/mongodb.js';

const app =  express();
const PORT = 8080;


//IMPLEMENTING CORS USING HEADER 

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*') //Allowing localhost to access particular client
//     res.header('Access-control-Allow-Headers', '*')
    
//     if(req.method == 'OPTIONS') {
//         return res.sendStatus(200)
//     }
//     next();
// })

// IMPLEMTATION OF CORS USING MIDDLEWARE

app.use(cors())

app.use(bodyParser.json())
app.use(loggerMiddleware)

// app.use(express.static('public'));
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))
app.use('/api/products',jwtAuth, productRouter)
app.use('/api/cartItems', jwtAuth, cartRouter)
app.use('/api/users', userRouter)
app.get('/', (req, res) => {
    res.send('Welcome to Ecommerce APIs.')
})
app.use((err, req, res, next) => {
    console.log(err.message);
    if (err instanceof ApplicationError) {
        res.status(err.statusCode).send(err.message)
    }

    logger.error(err.stack)
    res.status(500).send('Something is wrong with our system. please try again later')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port no ${PORT}`);
    connectToMongoDB();
})