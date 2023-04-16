const comment = require('../model/comment');
const user = require('../model/user');
 
const handleGetPublicComment = async (req, res) => {
    let limit = 2;
    const { postId,pageNo,userId} = req.query  
  
    let commentResult=[] 
    let allComments
    let totalCount
    if(userId){ 
        allComments = await comment.find({"userid":userId}).limit(limit*pageNo).sort('-createdAt') 
        totalCount = await comment.count({"userid":userId})  
         
        
    }
    else{  
        allComments = await comment.find({"postid":postId}).limit(limit*pageNo).sort('-createdAt')   
        totalCount = await comment.count({"postid":postId})
        
    }     
    const totalPage = Math.ceil(totalCount/limit)  
 
     
    if(allComments.length === 0) return res.status(204).json({"message":"Do not have any posts"})
    
    for(var i=0;i < allComments.length;i++){  
        const foundUser = await user.findOne({'_id':allComments[i].userid});
        let username   = foundUser.username
        let profileImage  = foundUser.profileImage  
        const newCmt = {...allComments[i].toObject(),'username':username, 'profileImage':profileImage} 
        commentResult.push(newCmt) 
    }  

     
    res.status(200).json({commentResult,totalPage,pageNo}) 

}
module.exports =  handleGetPublicComment; 