const post = require('../model/post');
const user = require('../model/user');
const comment = require('../model/comment');

 


const handleCreateNewPost = async (req, res) => {
    const { title, postcontent,postimage } = req.body;
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)
     
    if(!title || !postcontent) return res.status(400).json({ "message": 'Title and postcontent are required' });
    const result = await post.create({"title":title,"postcontent":postcontent,userid:foundUser._id,"postimage":postimage});
    res.status(201).json(result)
};
 
const handleDeletePost = async (req, res) => {
    
    const { postID } = req.body;
    if(!postID) return res.status(400).json({ "message": 'POST ID is required' });
    if(!req?.roles) return res.sendStatus(401); 
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)
    
    const foundPost = await post.findOne({"_id":postID})
    
    
    if(!foundPost) return res.status(409).json({"message": `Can not find post with ID: ${postID}`}) 
    if(foundPost.userid===foundUser._id.toString()|| foundUser.roles.Admin){
        const result = await post.deleteOne({"_id":postID}).exec();
        const deleteCommentsResult = await comment.deleteMany({'postid':postID}) 
        return res.status(204).json(result)
    }
    else{
        return res.sendStatus(401)
    }
    
};


const handleUpdatePost = async (req, res) => {
    
    const { postID,title,postcontent,postimage} = req.body; 
    console.log(postimage)
    if(!postID) return res.status(400).json({ "message": 'POST ID is required' });
    if(!req?.roles?.User) return res.sendStatus(401);
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)

    const foundPost = await post.findOne({"_id":postID})

    console.log(postimage)
    
    
    if(!foundPost) return res.status(409).json({"message": `Can not find post with ID: ${postID}`})
    if(foundPost.userid===foundUser._id.toString() || foundUser.roles.Admin){
        foundPost.title = title;   
        foundPost.postcontent = postcontent;
        if(postimage){
            foundPost.postimage =postimage;
        }
        foundPost.datemodify = new Date().toLocaleString("vi-VN")
        foundPost.save();
        return res.status(201).json(foundPost)
    }
    else{
        return res.sendStatus(401)
    }

     
};
module.exports = { handleCreateNewPost, handleDeletePost, handleUpdatePost};