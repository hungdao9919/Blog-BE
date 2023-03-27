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
        //fix lại format của ngày tháng năm
        const newModifiDate = `${allPost[i].datemodify.split(" ")[1].split("/")[2]}/${allPost[i].datemodify.split(" ")[1].split("/")[1]}/${allPost[i].datemodify.split(" ")[1].split("/")[0]} ${allPost[i].datemodify.split(" ")[0]}`
        postsResult.push({'id':allPost[i]._id,'title':allPost[i].title,'postcontent':allPost[i].postcontent,'datecreated':allPost[i].datecreated,'datemodify':newModifiDate,'username':username})  
   
          
        
    }  
    const sortedResult =  postsResult.sort((a,b)=>{
        return  Date.parse(b.datemodify) - Date.parse(a.datemodify)
    })
     
    return res.status(200).json(sortedResult)
        
        
        
    

}
module.exports =  handleGetPublicPosts;