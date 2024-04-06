import UserModel from "../features/user/user.model.js";

/**
 * This method is not used in this project as we created authentication using JWT 
 */

const basicAuthorizer = (req, res, next) => {

    // 1. Check if authorization header is empty or not.

    const authHeader = req.headers["authorization"]
    if(!authHeader) {
        return res.status(401).send("No authorization details found")
    }
    console.log(authHeader);

    // 2. Extract credentials

    const base64Credentials = authHeader.replace('Basic ', '')
    console.log(base64Credentials);

    // 3. Decode credentials

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf-8')
    console.log(decodedCreds);

    const creds = decodedCreds.split(':');

    const user = UserModel.getUsers().find(u => u.email == creds[0] && u.password == creds[1])
    if(user) {
        next()
    }
    else {
        return res.status(401).send('Incorrect Credentials')
    }
}

export default basicAuthorizer