const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
require('dotenv').config();

 

const handleGetUser = async (req, res) => {
    const foundUser = await user.findOne({"username":req.username},'username profileImage email lastname firstname createdAt updatedAt roles');
    if(!foundUser) return res.sendStatus(409)
    res.status(200).json(foundUser)
 }

const handleUpdateUser = async (req, res) => {
    const { password, email, lastname, firstname, profileImage, oldPassword } = req.body;
    if(!password &&!email &&!lastname &&!firstname &&!profileImage) return res.sendStatus(409)
     
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)
    if(password){
        const comparePassword = await bcrypt.compare(oldPassword,foundUser.password);
        if(comparePassword){ 
            foundUser.password=await bcrypt.hash(password, 10);
        }
        else{
            return res.sendStatus(409)
        }
        

    }
    if(email){
        foundUser.email=email
    }
    if(lastname){
        foundUser.lastname=lastname
    }
    if(firstname){
        foundUser.firstname=firstname
    }
    if(profileImage){
        foundUser.profileImage=profileImage
    }
    
    foundUser.save();
    res.status(200).json(foundUser)
}
const handleDeleteUser = async (req, res) => {
    //sử dụng cho user tự close account
    const { userid } = req.body;
    if(!userid) return res.status(400).json({ "message": 'userid is required' });

     
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)

      
     
    if(userid===foundUser._id.toString()){
        const result = await user.deleteOne({"_id":userid}).exec();
        res.clearCookie();
        return res.status(201).json(result)
    }
    else{
        return res.sendStatus(401)
    }
}

module.exports = {handleGetUser,handleUpdateUser,handleDeleteUser};
