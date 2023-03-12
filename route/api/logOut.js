const express = require('express');
const router = express.Router(); 
const handleLogOut = require('../../controller/logOutController');

router.post('/', handleLogOut);

module.exports = router;
