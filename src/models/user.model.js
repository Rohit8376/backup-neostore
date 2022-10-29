const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        minLength: 3,
        maxLength:20
    },
    secondName: {
        type: String,
        trim: true,
        required: true
    },
    contactNo: {
        type: Number,
        trim: true,
        unique:true,
        // min:70000000000,
        // max:99999999999
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String
    },
    profile_pic: {
        filename: { type: String, default:null },
        destination:{ type: String, default:null },
        fileType: { type: String, default:null },
    },
    gender: {
        type: String,
        trim: true,
        enum: [`male`, `female`],
    },
    role: {
        type: String,
        default: `customer`,
        required: true
    },
    orders: {
        type: Array
    },
    addresses: [{
        address: {
            type: String,
            trim: true,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }],
    defaultAddress: ObjectId,
    resetCode: Number,
    SSOprovider: String,
    cartId: {
        type: ObjectId
    },
    contactNoVerified: {
        type:Boolean,
        default: false
    }
})

const userModel = mongoose.model(`userModel`, userSchema);

module.exports = userModel;