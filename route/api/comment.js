const express = require('express');
const router = express.Router(); 
const { handleCreateNewComment, handleDeleteComment, handleUpdateComment} = require('../../controller/commentController');

router.post('/', handleCreateNewComment);
router.put('/', handleUpdateComment);
router.delete('/', handleDeleteComment);

module.exports = router;
