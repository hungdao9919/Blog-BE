const express = require('express');
const router = express.Router(); 
const handleGetPublicPosts = require('../../controller/postPublicController');

 
router.get('/', handleGetPublicPosts);
 

module.exports = router;
