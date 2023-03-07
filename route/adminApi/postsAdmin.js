const express = require('express');
const router = express.Router(); 
const { handleDeletePostByAdmin, handleUpdatePostByAdmin } = require('../../controller/postsAdminController');

// router.post('/', handleCreateNewComment);
router.put('/', handleUpdatePostByAdmin);
router.delete('/', handleDeletePostByAdmin);

module.exports = router;
