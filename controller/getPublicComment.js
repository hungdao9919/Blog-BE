const comment = require('../model/comment');
 
const handleGetPublicComment = async (req, res) => {
    const {postid } = req.body;

    const allComments = await comment.find({"postid":postid})
    if(allComments.length === 0) return res.status(204).json({"message":"Do not have any posts"})
    res.status(200).json(allComments)

}
module.exports =  handleGetPublicComment;