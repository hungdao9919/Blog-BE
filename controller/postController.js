const jwt = require('jsonwebtoken');
const post = require('../model/post');
const user = require('../model/user');

require('dotenv').config();



const handleCreateNewPost = async (req, res) => {
    const { title, postcontent } = req.body;
    const foundUser = await user.findOne({"username":req.username});
     
    if(!title || !postcontent) return res.status(400).json({ message: 'Title and postcontent are required' });
    const result = await post.create({"title":title,"postcontent":postcontent,userid:foundUser._id});
    res.status(201).json(result)
};
const handleGetPost = async (req, res) => {
    console.log('get postssss')
     //check role, nếu là admin thì get all posts, user thì get post by user id
    //  const { title, postcontent } = req.body;
    // const foundUser = await user.findOne({"username":req.username});
    // if(req.roles)
};
const handleDeletePost = async (req, res) => {
    console.log('delete postssss')

     //check role, nếu là admin thì hiện all posts, user thì hiện post by user id
};


const handleUpdatePost = async (req, res) => {
     //check role, nếu là admin thì hiện all posts, user thì hiện post by user id
    console.log('update postssss')

     
};
module.exports = { handleCreateNewPost, handleGetPost, handleDeletePost, handleUpdatePost};