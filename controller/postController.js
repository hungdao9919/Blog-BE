const post = require('../model/post');
const user = require('../model/user');

 


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

    // const allPost = await post.find({})
    // if(!allPost) return res.status(204).json({"message":"Do not have any posts"})
    // res.status(200).json(allPost)
};
const handleDeletePost = async (req, res) => {
    //trường hợp usuer có roles là admin thì cho xóa luôn, còn user có role chỉ là user thì check user id của post đó có bằng user id của user reqeust ko 
    // check id post có nằm trong list post của user ko?
    const { postID } = req.body;
    if(!postID) return res.status(400).json({ "message": 'POST ID is required' });

    if(!req.roles) return res.sendStatus(401);
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)

    const foundPost = await post.findOne({"_id":postID})

 
    if(!foundPost) return res.status(409).json({"message": `Can not find post with ID: ${postID}`})
    if(req.roles.Admin){
        const result = await post.deleteOne({"_id":postID});
         return res.status(201).json(result)
    }

    else{
          
        if(foundPost.userid===foundUser._id.toString()){
            const result = await post.deleteOne({"_id":postID}).exec();
            return res.status(201).json(result)
        }
        else{
            return res.sendStatus(401)
        }
       
       
    }
    
};


const handleUpdatePost = async (req, res) => {
     //check role, nếu là admin thì hiện all posts, user thì hiện post by user id
    const { postID,title,postcontent } = req.body;
    if(!postID) return res.status(400).json({ "message": 'POST ID is required' });
    if(!req.roles) return res.sendStatus(401);
    const foundUser = await user.findOne({"username":req.username});
    if(!foundUser) return res.sendStatus(409)

    const foundPost = await post.findOne({"_id":postID})

 
    if(!foundPost) return res.status(409).json({"message": `Can not find post with ID: ${postID}`})
    if(req.roles.Admin){
         foundPost.title = title;   
         foundPost.postcontent = postcontent;
         foundPost.datemodify = new Date().toLocaleString("vi-VN")
         foundPost.save();
         return res.status(201).json(foundPost)
    }

    else{
          
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
       
       
    }

     
};
module.exports = { handleCreateNewPost, handleGetPost, handleDeletePost, handleUpdatePost};