const user = require('../model/user');

const handleGetUser = async (req, res) => {
    console.log(req.query.username)
    const foundUser = await user.findOne({"username":req.query.username},'username profileImage email lastname firstname createdAt updatedAt');
    if(!foundUser) return res.sendStatus(409)
    console.log(foundUser)
    res.status(200).json(foundUser)

 }
 module.exports= {handleGetUser}