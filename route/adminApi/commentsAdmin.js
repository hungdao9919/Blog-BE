const express = require('express');
const router = express.Router(); 
const { handleDeleteCommentByAdmin, handleUpdateCommentByAdmin } = require('../../controller/commentsAdminController');

// router.post('/', handleCreateNewComment);
router.put('/', handleUpdateCommentByAdmin);
router.delete('/', handleDeleteCommentByAdmin);

module.exports = router;
