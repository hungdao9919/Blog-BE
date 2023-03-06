const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
require('dotenv').config();

 

const handleCreateNewUser = async (req, res) => {
    const { username, password, email, lastname, firstname } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });
    const duplicatedUsername = await user.findOne({ username: username }).exec();
    if (duplicatedUsername) return res.status(409).json({ message: 'Username was existed' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const accessToken = jwt.sign(
        {
            "userInfo": {
                "username": username,
                "roles": { User: 2001 },
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '20s'},
    );
  
    const refreshToken = jwt.sign(
        {
            "username": username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : '24h'},
    );
    const result = await user.create(
        {
            "username": username,
            "password": hashedPassword,
            "refreshToken": refreshToken,
            "email": email,
            "lastname": lastname,
            "firstname": firstname, 
        });
    
     
    res.clearCookie();
    res.cookie('jwt',refreshToken,{httpOnly:true,maxAge : 24*24*60*1000})
    res.status(201).json({accessToken})
     
};
module.exports = handleCreateNewUser;
