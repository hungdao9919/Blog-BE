 
const user = require('../model/user');

const handleLogOut = async (req,res)=>{
    

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    
    const foundUser = await user.findOne({refreshToken:refreshToken}).exec();

    if(!foundUser) {
        res.clearCookie('jwt',{httpOnly:true})
        return res.sendStatus(403) //forbiden

    }
 

    foundUser.refreshToken=''
    const result = await foundUser.save(); 
     
    res.clearCookie('jwt',{httpOnly:true})
    res.sendStatus(204)

}
        

module.exports = handleLogOut;