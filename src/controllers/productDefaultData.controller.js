const productCategoryModel = require('../models/productCategories.model');
const productColorsModel = require('../models/productColors.model');

//array format
exports.addProductCategories = async (req, res) => {
    try {
        if (req.body && req.body.productCategories.length > 0) {
            const data = await productCategoryModel.find({});
            let newProductCategories = req.body.productCategories;

            if (!data.length) {
                const newProductCategoryData = new productCategoryModel({
                    productCategories: newProductCategories
                })
                newProductCategoryData.save(newProductCategoryData).then((savedData) => {
                    console.log(savedData);
                    res.status(200).send({
                        msg: `new object created with given product categories`,
                        savedData
                    })
                }).catch(err => {
                    console.log(err);
                    res.status(400).send({
                        err
                    })
                })
            }
            else {
                var productCategoryId = data[0]._id;
                let productCategoryData = await productCategoryModel.findById(productCategoryId);
                let duplicateCategories = 0, newCategories = 0, message = ``;

                newProductCategories.forEach(category => {
                    category = category.toLowerCase();
                    if (!productCategoryData.productCategories.includes(category)) {
                        newCategories++;
                        productCategoryData.productCategories.push(category);
                    }
                    else duplicateCategories++;
                });

                if (newCategories === 0) {
                    message = `provided existing categories. no changed made to database`
                    res.status(200).send({
                        message
                    })
                    return;
                }
                else {
                    message = `${newCategories} categories added. ${duplicateCategories} duplicate categories found and avoided`;
                    productCategoryModel.save(productCategoryModel).then(savedData => {
                        res.status(200).send({
                            message,
                            savedData
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(400).send({
                            err
                        })
                    })
                }

            }
        }
        else
            res.status(400).send({
                msg: 'Should provide atleat one product category to proceed'
            })
    } catch (error) {
        console.log(error);
    }

}

exports.getProductCategories = async (req, res) => {

    var data = await productCategoryModel.find({});
    data = data[0];

    res.status(200).send({
        msg: 'Returning data',
        data
    })

}

exports.addProductColors = async (req, res) => {
    try {
        if (req.body && req.body.productColors.length > 0) {
            const data = await productColorsModel.find({});
            let newProductColors= req.body.productColors;

            if (!data.length) {
                const newProductColorData = new productColorsModel({
                    productColors: newProductColors
                })
                newProductColorData.save(newProductColorData).then((savedData) => {
                    res.status(200).send({
                        msg: `new object created with given product colors`,
                        savedData
                    })
                }).catch(err => {
                    console.log(err);
                    res.status(400).send({
                        err
                    })
                })
            }
            else {
                var productColorId = data[0]._id;
                let productColorData = await productColorsModel.findById(productColorId);
                let duplicateColors = 0, newColors = 0, message = ``;

                newProductColors.forEach(color => {
                    color = color.toLowerCase();
                    if (!productColorData.productColors.includes(color)) {
                        newColors++;
                        productColorData.productColors.push(color);
                    }
                    else duplicateColors++;
                });

                if (newColors === 0) {
                    message = `provided existing colors. no changed made to database`
                    res.status(200).send({
                        message
                    })
                    return;
                }
                else {
                    message = `${newColors} colors added. ${duplicateColors} duplicate colors found and avoided`;
                    productColorData.save(productColorData).then(savedData => {
                        res.status(200).send({
                            message,
                            savedData
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(400).send({
                            err
                        })
                    })
                }

            }
        }
        else
            res.status(400).send({
                msg: 'Should provide atleat one product color to proceed'
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:`Server error, something broke`
        })
    }
}

exports.getProductColors = async (req, res) => {
    var data = await productColorsModel.find({});
    data = data[0];
    res.status(200).send({
        msg: 'Returning data',
        data
    })
}