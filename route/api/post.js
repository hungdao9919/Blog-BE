const express = require('express');
const router = express.Router(); 
const {handleCreateNewPost, handleGetPost, handleUpdatePost, handleDeletePost} = require('../../controller/postController');

router.post('/', handleCreateNewPost);
router.get('/', handleGetPost);
router.put('/', handleUpdatePost);
router.delete('/', handleDeletePost);

module.exports = router;
