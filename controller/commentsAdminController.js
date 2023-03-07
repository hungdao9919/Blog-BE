 const user = require('../model/user');
const comment = require('../model/comment');

const handleDeleteCommentByAdmin = async (req, res) => {
     
    const { commentID } = req.body;
   if(!commentID) return res.status(400).json({ "message": 'commentID is required' });

   const foundUser = await user.findOne({"username":req.username});

   if(!req?.roles?.Admin || !foundUser?.roles?.Admin) return res.sendStatus(401);

   if(!foundUser) return res.sendStatus(409)

   const foundComment = await comment.findOne({"_id":commentID})


   if(!foundComment) return res.status(409).json({"message": `Can not find comment with ID: ${commentID}`})
    
    const result = await comment.deleteOne({"_id":commentID});
    return res.status(201).json(result)
         
 
   

};

const handleUpdateCommentByAdmin = async (req, res) => {
     
    const { commentID,commentcontent } = req.body;
    if(!commentID||!commentcontent) return res.status(400).json({ "message": 'commentID and commentcontent is required' });

    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)

    if(!req?.roles?.Admin || !foundUser?.roles?.Admin) return res.sendStatus(401);

    const foundComment = await comment.findOne({"_id":commentID})

 
    if(!foundComment) return res.status(409).json({"message": `Can not find comment with ID: ${commentID}`})

    foundComment.commentcontent=commentcontent;
    foundComment.datemodify=new Date().toLocaleString("vi-VN");
    foundComment.save();
    return res.status(201).json(foundComment)     
};
module.exports = {handleDeleteCommentByAdmin, handleUpdateCommentByAdmin}