const express = require('express');
const router = express.Router(); 
const handleGetPublicPosts = require('../../controller/postPublicController');

 
// router.get('/:pageNo', handleGetPublicPosts);  
router.get('/', handleGetPublicPosts);  
module.exports = router;
