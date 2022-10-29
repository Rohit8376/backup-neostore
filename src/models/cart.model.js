const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required:true,
    },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    userEmail: {
        type: String,
        required: true
    },
    productIds: Array,
    productDetails: [{
        productId: ObjectId,
        productName: String,
        productSeller: String,
        productColor: String,
        productStock: Number,
        orderQuantity: Number,
        productImage: String,
        productPrice: Number,
        total: Number
    }],
    subTotalPrice: Number,
    totalPrice: Number
})

const cartModel = mongoose.model(`cartModel`, cartSchema);

module.exports = cartModel;