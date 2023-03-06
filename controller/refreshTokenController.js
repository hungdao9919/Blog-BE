const jwt = require('jsonwebtoken');
const user = require('../model/user');
require('dotenv').config();
const handleRefreshToken = async (req,res,next)=>{ 
 
      const refreshToken = req.cookies.jwt
      const foundUser =  await user.findOne({"refreshToken":refreshToken}); 
      if(!refreshToken || !foundUser) return res.sendStatus(401) 
      const accessToken = jwt.sign(
          {
              "userInfo": {
                  "username": foundUser.username,
                  "roles": foundUser.roles,
              },
          },process.env.ACCESS_TOKEN_SECRET,
          {expiresIn:'20s'}
     )
     return res.status(200).json({accessToken})




     //get refreshtoken từ cookies, find user ở db bằng refresh tooken, verify coi có phải refreshtoken.user từ cookies  = freshtoken từ db ko,
     //nếu ok thì sign cho access token mới
}
module.exports=handleRefreshToken;