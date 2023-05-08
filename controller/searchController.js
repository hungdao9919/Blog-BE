 
const post = require('../model/post');
 
const handleSearch = async (req, res) => {
    const {query} = req.query 
    if(!query) return res.sendStatus(204) 

    const postResult = await post.find({$text:{$search: query,$caseSensitive:true}})
        
    return res.status(200).json(postResult)
    

}
module.exports =  handleSearch;