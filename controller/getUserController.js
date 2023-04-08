const user = require('../model/user');

const handleGetUser = async (req, res) => {
    console.log(req.query.username)
    const foundUser = await user.findOne({"username":req.query.username});
    if(!foundUser) return res.sendStatus(409)
    res.status(200).json(foundUser)
 }
 module.exports= {handleGetUser}