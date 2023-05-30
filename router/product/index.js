const router = require('express').Router();
const { createProduct } = require('../../controller/productController');
const { authenticateToken, isAgent } = require('../../utils/jwtToken');

router.post('/createProduct', authenticateToken, isAgent, createProduct)

module.exports = router