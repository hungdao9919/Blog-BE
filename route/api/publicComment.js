const express = require('express');
const router = express.Router(); 
const handleGetPublicComment = require('../../controller/getPublicComment');

 
router.get('/', handleGetPublicComment);
 

module.exports = router;
