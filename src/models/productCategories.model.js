const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    productCategories: [],
    topRatedProducts:[{
        productId:ObjectId,
        averageRating: Number,
        count: Number
    }],
    productCount: {
        type: Number,
        default: 0
    },
    orderId:{
        type: Number,
        default: 10000
    }
})

const productCategoryData = mongoose.model('productCategoryData', productCategorySchema);

module.exports = productCategoryData;