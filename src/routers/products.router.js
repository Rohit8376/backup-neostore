const express = require('express');
const productController = require('../controllers/products.controller');
const upload = require('../helpers/uploadFiles.helper');
const auth = require('../middlewares/auth');
const productRouter = new express.Router();

//main apis

//admin
productRouter.post('/addNewProduct', upload.fields([{
    name: `images`, maxCount: 5
}]), productController.addProduct, (req, res) => {
    res.json({ res });
})

productRouter.post('/addProductImages/:id&:color', upload.fields([{
    name: `images`, maxCount: 5
}]), productController.addProductImages, (req, res) => {
    res.json({ res })
})

/*********************************************************************************** */
//user
productRouter.get('/getDashboard', auth.verifyToken, productController.getDashboard, (req, res) => {
    res.json({ res });
})

productRouter.post('/find/:keyword', auth.verifyToken, productController.searchForProduct, (req, res) => {
    res.json({ res });
})

productRouter.get('/commonProducts', auth.verifyToken, productController.getCommonProducts, (req, res) => {
    res.json({ res });
})

productRouter.post('/filterCommonProducts', auth.verifyToken, productController.filterCommonProducts, (req, res) => {
    res.json({ res });
})


productRouter.get('/getProductDetails/:id&:color', auth.verifyToken, productController.getProductDetails, (req, res) => {
    res.json({ res })
})

productRouter.post('/addToCart/:id&:color', auth.verifyToken, productController.addProductToCart, (req, res) => {
    res.json({ res });
})

productRouter.post(`/addRating/:id&:rating`, auth.verifyToken, productController.addProductRating, (req, res) => {
    res.json({ res });
})

//other apis for testing purposes
productRouter.post('/uploadFiles', upload.fields([{
    name: `images`, maxCount: 5
}]), productController.uploadedFiles, async (req, res) => {
    await res.json({ res });
})

module.exports = productRouter;