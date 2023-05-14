const express = require('express');
const router = express.Router(); 
const {handleCreateNewPost, handleUpdatePost, handleDeletePost} = require('../../controller/postController');

router.post('/', handleCreateNewPost); 
router.put('/', handleUpdatePost);
router.delete('/', handleDeletePost);

module.exports = router;
