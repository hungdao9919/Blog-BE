const post = require('../model/post');
const user = require('../model/user');
const comment = require('../model/comment');

 


const handleCreateNewComment = async (req, res) => {
    //taoj cmt gắn với post
    const {postid, commentcontent } = req.body;
  
    if(!commentcontent ||!postid) return res.status(400).json({ "message": 'userid, postid and commentcontent are required' });
  
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409); //conflig

    const foundPost = await post.findOne({"_id":postid})

    if(!foundPost) return res.status(409).json({"message": `Can not find post with ID: ${postID}`})

     
    const result = await comment.create({"userid":foundUser._id,"commentcontent":commentcontent,"postid":postid});
    res.status(201).json(result)
};
 
const handleDeleteComment = async (req, res) => {
     //check new la admin thi ok hết, còn user thì chỉ được quyền xóa của user đó 
     const { commentID } = req.body;
    if(!commentID) return res.status(400).json({ "message": 'commentID is required' });

    if(!req.roles) return res.sendStatus(401);
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)

    const foundComment = await comment.findOne({"_id":commentID})

 
    if(!foundComment) return res.status(409).json({"message": `Can not find comment with ID: ${commentID}`})
    if(req.roles.Admin){
        const result = await comment.deleteOne({"_id":commentID});
         return res.status(201).json(result)
    }

    else{
          
        if(foundComment.userid===foundUser._id.toString()){
            const result = await comment.deleteOne({"_id":commentID});
            return res.status(201).json(result)
        }
        else{
            return res.sendStatus(401)
        }
       
       
    }
    

};


const handleUpdateComment = async (req, res) => {
     //check new la admin thi ok hết, còn user thì chỉ được quyền xóa của user đó 
     const { commentID,commentcontent } = req.body;
     if(!commentID||!commentcontent) return res.status(400).json({ "message": 'commentID and commentcontent is required' });
 
     if(!req.roles) return res.sendStatus(401);
     const foundUser = await user.findOne({"username":req.username});
     if(!foundUser) return res.sendStatus(409)
 
     const foundComment = await comment.findOne({"_id":commentID})
 
  
     if(!foundComment) return res.status(409).json({"message": `Can not find comment with ID: ${commentID}`})
     if(req.roles.Admin){
          foundComment.commentcontent=commentcontent;
          foundComment.datemodify=new Date().toLocaleString("vi-VN");
          foundComment.save();
          return res.status(201).json(foundComment)
     }
 
     else{
           
         if(foundComment.userid===foundUser._id.toString()){
               foundComment.commentcontent=commentcontent;
               foundComment.datemodify=new Date().toLocaleString("vi-VN");
               foundComment.save();
               return res.status(201).json(foundComment)
         }
         else{
             return res.sendStatus(401)
         }
        
        
     }

     
};
module.exports = { handleCreateNewComment, handleDeleteComment, handleUpdateComment};