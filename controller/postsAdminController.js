const post = require('../model/post');
const user = require('../model/user');

 
 
 
const handleDeletePostByAdmin = async (req, res) => {
    
    const { postID } = req.body;
    if(!postID) return res.status(400).json({ "message": 'POST ID is required' });

     
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)
    if(!req?.roles?.Admin || !foundUser?.roles?.Admin) return res.sendStatus(401);


    const foundPost = await post.findOne({"_id":postID})

    if(!foundPost) return res.status(409).json({"message": `Can not find post with ID: ${postID}`})

    const result = await post.deleteOne({"_id":postID});
    return res.status(201).json(result)

    
    
};


const handleUpdatePostByAdmin = async (req, res) => {
    
    const { postID,title,postcontent } = req.body;
    if(!postID) return res.status(400).json({ "message": 'POST ID is required' });
    
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)
    if(!req?.roles?.Admin || !foundUser?.roles?.Admin) return res.sendStatus(401);

    const foundPost = await post.findOne({"_id":postID})
    if(!foundPost) return res.status(409).json({"message": `Can not find post with ID: ${postID}`})

    foundPost.title = title;   
    foundPost.postcontent = postcontent;
    foundPost.datemodify = new Date().toLocaleString("vi-VN")
    foundPost.save();
    return res.status(201).json(foundPost)

     
};
module.exports = {  handleDeletePostByAdmin, handleUpdatePostByAdmin};