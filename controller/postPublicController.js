const post = require('../model/post');
const user = require('../model/user');
 
const handleGetPublicPosts = async (req, res) => {
    const allPost = await post.find({})
    if(allPost.length===0) return res.status(204).json({"message":"Do not have any posts"})
    
    let postsResult=[]
    for(var i=0;i < allPost.length;i++){ 

        const foundUser = await user.findOne({'_id':allPost[i].userid});
        let username 
        if(!foundUser){
            username = 'removed user'
        }
        else{
            username = foundUser.username
        }
        postsResult.push({'id':allPost[i]._id,'title':allPost[i].title,'postcontent':allPost[i].postcontent,'datecreated':allPost[i].datecreated,'datemodify':allPost[i].datemodify,'username':username}) 
    } 
    return res.status(200).json(postsResult)
        
        
        
    

}
module.exports =  handleGetPublicPosts;