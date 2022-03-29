const jwt = require("jsonwebtoken")
const jwtSecret = "mysuperdupersecret";

module.exports = function(req,res,next){
    // Get token from header
    const token = req.header("X-Auth-Token");  // x-auth-token header key,send along with the token

    // check if not token
    if(!token) {
        res.status(401).json({ msg: "No token, authorization denied"})
        return;

    }

    // verify token 
    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({ msg: "Token is not valid" })
        
    }
}