const express = require('express');
const router = express.Router(); 
const {handleCreateNewPost} = require('../../controller/postController');

router.post('/', handleCreateNewPost);

module.exports = router;
