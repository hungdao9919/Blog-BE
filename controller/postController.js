const post = require('../model/post');
const user = require('../model/user');
const comment = require('../model/comment');

 


const handleCreateNewPost = async (req, res) => {
    const { title, postcontent } = req.body;
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)
     
    if(!title || !postcontent) return res.status(400).json({ "message": 'Title and postcontent are required' });
    const result = await post.create({"title":title,"postcontent":postcontent,userid:foundUser._id});
    res.status(201).json(result)
};
const handleGetPost = async (req, res) => {
    
    if(!req.roles) return res.sendStatus(401);
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)

    if(foundUser.roles.Admin){
        const allPost = await post.find({})
        res.status(200).json(allPost)
    }
    else{
        const postOfUser = await post.find({"userid":foundUser._id})
        res.status(200).json(postOfUser) 
    } 

    
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
    
    const { postID,title,postcontent } = req.body;
    if(!postID) return res.status(400).json({ "message": 'POST ID is required' });
    if(!req?.roles?.User) return res.sendStatus(401);
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)

    const foundPost = await post.findOne({"_id":postID})

 
    if(!foundPost) return res.status(409).json({"message": `Can not find post with ID: ${postID}`})
    if(foundPost.userid===foundUser._id.toString()){
        foundPost.title = title;   
        foundPost.postcontent = postcontent;
        foundPost.datemodify = new Date().toLocaleString("vi-VN")
        foundPost.save();
        return res.status(201).json(foundPost)
    }
    else{
        return res.sendStatus(401)
    }

     
};
module.exports = { handleCreateNewPost, handleGetPost, handleDeletePost, handleUpdatePost};