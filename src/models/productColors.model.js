const mongoose = require('mongoose');

const productColorSchema = new mongoose.Schema({
    productColors: []
})

const productColorData = mongoose.model('productColorData', productColorSchema);

module.exports = productColorData;