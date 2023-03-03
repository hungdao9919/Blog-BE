const jwt = require('jsonwebtoken');
require('dotenv').config();
const handleVerifyJWT = (req,res,next)=>{ 
     
    const token = req?.headers?.authorization?.split(" ")[1] 
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) 
    next();
}
module.exports=handleVerifyJWT;