const post = require('../model/post');
const user = require('../model/user');
 
const handleGetPublicPosts = async (req, res) => {
    const limit = 8;
    const pageNo = req.params.pageNo;   
    const skip = (pageNo -1)*limit 
    const allPost = await post.find({}).limit(limit).skip(skip).sort('-createdAt')
    const totalCount = await post.count({})
    const totalPage = Math.ceil(totalCount/limit) 
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
         
            
        const newPost = {...allPost[i].toObject(),'username':username} 
        postsResult.push(newPost)
         
          
        
    }      
    return res.status(200).json({postsResult,totalPage,pageNo})
        
        
        
    

}
module.exports =  handleGetPublicPosts;