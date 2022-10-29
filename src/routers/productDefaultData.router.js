const express = require('express');
const productDeaultDataController = require('../controllers/productDefaultData.controller');

const productDeaultDataRouter = new express.Router();

productDeaultDataRouter.post('/addProductCategories', productDeaultDataController.addProductCategories, (req,res) => {
    res.json({res});
})

productDeaultDataRouter.get('/getProductCategories', productDeaultDataController.getProductCategories, (req,res) => {
    res.json({res});
})

productDeaultDataRouter.post('/addProductColors', productDeaultDataController.addProductColors, (req,res) => {
    res.json({res});
})

productDeaultDataRouter.get('/getProductColors', productDeaultDataController.getProductColors, (req,res) => {
    res.json({res});
})

module.exports = productDeaultDataRouter;