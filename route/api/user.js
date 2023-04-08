const express = require('express');
const router = express.Router(); 
const { handleDeleteUser,handleUpdateUser,handleGetUser} = require('../../controller/userController');
router.get('/', handleGetUser);

router.put('/', handleUpdateUser);
router.delete('/', handleDeleteUser);

module.exports = router;
