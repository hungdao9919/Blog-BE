const express = require('express');
const router = express.Router(); 
const handleGetPublicPosts = require('../../controller/postPublicController');

 
router.get('/:pageNo', handleGetPublicPosts); 

module.exports = router;
