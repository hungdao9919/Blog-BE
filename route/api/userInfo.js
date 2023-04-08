const express = require('express');
const router = express.Router(); 
const {handleGetUser} = require('../../controller/getUserController')
 
router.get('/', handleGetUser);


module.exports = router;
