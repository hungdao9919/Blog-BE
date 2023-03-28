const comment = require('../model/comment');
const user = require('../model/user');
 
const handleGetPublicComment = async (req, res) => {
    const  postid = req.params.id;
     
    const allComments = await comment.find({"postid":postid})
    if(allComments.length === 0) return res.status(204).json({"message":"Do not have any posts"})
    let commentResult=[] 
    for(var i=0;i < allComments.length;i++){  
        const foundUser = await user.findOne({'_id':allComments[i].userid});
        let username 
        let profileImage
        if(!foundUser){
            username = 'removed user'
            profileImage='../img/here-image-pcngon-3.jpg'
        }
        else{ 
            username = foundUser.username
            profileImage = foundUser.profileImage
        }
        //fix lại format của ngày tháng năm
        const newModifiDate = `${allComments[i].datemodify.split(" ")[1].split("/")[2]}/${allComments[i].datemodify.split(" ")[1].split("/")[1]}/${allComments[i].datemodify.split(" ")[1].split("/")[0]} ${allComments[i].datemodify.split(" ")[0]}`
        commentResult.push({'id':allComments[i]._id,'commentcontent':allComments[i].commentcontent,'datecreated':allComments[i].datecreated,'datemodify':newModifiDate,'username':username, 'profileImage':profileImage,'userid':allComments[i].userid})  
   
          
        
    }  

    const sortedResult =  commentResult.sort((a,b)=>{
        return  Date.parse(b.datemodify) - Date.parse(a.datemodify)
    }) 
    res.status(200).json(sortedResult) 

}
module.exports =  handleGetPublicComment; 