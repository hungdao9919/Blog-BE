const comment = require('../model/comment');
const user = require('../model/user');
 
const handleGetPublicComment = async (req, res) => {
    const  postid = req.params.id;
     
    const allComments = await comment.find({"postid":postid}).sort('-createdAt')
    if(allComments.length === 0) return res.status(204).json({"message":"Do not have any posts"})
    let commentResult=[] 
    for(var i=0;i < allComments.length;i++){  
        const foundUser = await user.findOne({'_id':allComments[i].userid});
        let username 
        let profileImage
        if(!foundUser){
            username = 'removed user'
            profileImage='../img/here-image-pcngon-3.jpg'
        }
        else{ 
            username = foundUser.username
            profileImage = foundUser.profileImage
        }
        const newCmt = {...allComments[i].toObject(),'username':username, 'profileImage':profileImage} 
        commentResult.push(newCmt)
          
        
    }  

     
    res.status(200).json(commentResult) 

}
module.exports =  handleGetPublicComment; 