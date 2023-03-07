const post = require('../model/post');
 
const handleGetPublicPosts = async (req, res) => {
    const allPost = await post.find({})
   if(allPost.length===0) return res.status(204).json({"message":"Do not have any posts"})
   res.status(200).json(allPost)

}
module.exports =  handleGetPublicPosts;