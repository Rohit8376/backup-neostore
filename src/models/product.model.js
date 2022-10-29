const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required:true,
        trim: true,
        unique:true
    },
    productSeller: {
        type: String,
        required:true,
    },
    productDesc: {
        type: String,
        required:true
    },
    productFeatures: {
        type: String,
        required:true
    },
    productCategory: {
        type: String,
        trim: true,
        required:true
    },
    productColors: {
        type: Array,
        required: true
    },
    productImages:[{
        filename: String,
        destination: String,
        fileType: String
    }],
    defaultColor: {
        type: String
    },
    rating:{
        count: Number,
        users: Array,
        average: Number
    },
    productPrice: {
        type: Number,
        trim: true,
        required:true
    },
    productStockCount:{
        type: Number,
        trim: true,
        required:true
    },
    productOrderCount: Number,
    productOrderSuccess: Number
})

const productModel = mongoose.model(`productModel`, productSchema); 

module.exports = productModel;