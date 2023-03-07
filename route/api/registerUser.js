const express = require('express');
const router = express.Router(); 
const handleCreateNewUser = require('../../controller/registerUserController');

router.post('/', handleCreateNewUser);

module.exports = router;
