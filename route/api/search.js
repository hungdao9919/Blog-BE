const express = require('express');
const router = express.Router(); 
const handleSearch =require('../../controller/searchController')

  
router.get('/', handleSearch);  
module.exports = router;
