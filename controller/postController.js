const jwt = require('jsonwebtoken');
const post = require('../model/post');
require('dotenv').config();



const handleCreateNewPost = async (req, res) => {
    const { title, postcontent } = req.body;
    if(!title || !postcontent) return res.status(400).json({ message: 'Title and postcontent are required' });
    const result = await post.create({"title":title,"postcontent":postcontent});
    res.status(201).json(result)
    
};
module.exports = {handleCreateNewPost};