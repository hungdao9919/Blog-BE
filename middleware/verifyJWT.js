const jwt = require('jsonwebtoken');
require('dotenv').config();
const handleVerifyJWT = (req,res,next)=>{  

    const token = req?.headers?.authorization?.split(" ")[1]    
    if(!token) return res.sendStatus(401) 

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
        if(err) return res.sendStatus(403) 
        req.username = decoded.userInfo.username
        req.roles = decoded.userInfo.roles
        next();
    });
}
module.exports=handleVerifyJWT;