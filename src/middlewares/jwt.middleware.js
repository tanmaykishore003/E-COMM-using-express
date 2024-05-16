
import jwt from "jsonwebtoken"

const jwtAuth = (req, res, next) => {
    // 1. Read the token.
    const token = req.headers['authorization']

    // 2. If no token then return error
    if(!token) {
        return res.status(401).send('Unauthorized')
    }

    // 3. Check if token is valid
    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.userID = payload.userID;
        console.log(payload);
    } catch(err){
        // 4. return error.
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    // 5. Call next middleware in the pipeline
    next()

}

export default jwtAuth;