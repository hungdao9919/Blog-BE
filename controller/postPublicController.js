const post = require('../model/post');
const user = require('../model/user');
 
const handleGetPublicPosts = async (req, res) => {
    const limit = 12;
    const {pageNo,userId,postId} = req.query;    
    console.log(pageNo)  
    let  skip
    if(pageNo<=0){
        skip = 0
    }
    else{
        skip = (pageNo -1)*limit 
    }
    let allPost
    let totalCount
    if(userId){
        allPost = await post.find({'userid':userId}).limit(limit).skip(skip).sort('-createdAt')  
        totalCount = await post.count({'userid':userId}) 

    }
    else if(postId){ 
        allPost = await post.find({'_id':postId})  
        totalCount = 1
    }
    else{ 
        allPost = await post.find({}).limit(limit).skip(skip).sort('-createdAt')
        totalCount = await post.count({})
    }
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
    console.log(totalPage,pageNo)
    return res.status(200).json({postsResult,totalPage,pageNo})
        
        
        
    

}
module.exports =  handleGetPublicPosts;