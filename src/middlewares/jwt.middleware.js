
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
            "jmRdCxf834yOjYVbDkOjhAgyk23b9eek"
        );
        req.userId = payload.userId
        console.log(payload);
    }
    // 4. Else return error
    catch(err) {
        return res.status(401).send('Unauthorized')
    }

    // 5. Call next middleware in the pipeline
    next()

}

export default jwtAuth;