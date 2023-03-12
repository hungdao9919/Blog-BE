const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
require('dotenv').config();

 

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });
    const foundUser = await user.findOne({"username":username});
    if(!foundUser) return res.status(401).json({"message":"Wrong credentials"})
    const comparePassword = await bcrypt.compare(password,foundUser.password);
    if(comparePassword){
        const accessToken = jwt.sign(
        {
            "userInfo": {
                "username": username,
                "roles": foundUser.roles,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'20s'}
        )
        foundUser.refreshToken = jwt.sign(
            {
                "username": username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : '24h'},
        );
        const result = await foundUser.save();
         
        
          
        res.cookie('jwt',foundUser.refreshToken,{httpOnly:true,maxAge : 24*24*60*1000})

        return res.status(200).json({accessToken})
    }
    else{
        return res.status(401).json({"message":"Wrong credentials"})
    }
    
    
};
module.exports = handleLogin;
