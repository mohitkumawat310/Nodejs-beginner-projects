const jwt = require('jsonwebtoken');
const signInAuth = async(req,res,next)=>{
    const signInToken = req.cookies.signInToken;
    if(!signInToken){
        res.redirect("/");
        return next();
    }
    try {
        jwt.verify(signInToken, process.env.jwtToken);
        // console.log("Token verified")
        return next();
    } catch (error) {
        res.redirect("/");
        return next();
    }
}
module.exports = signInAuth