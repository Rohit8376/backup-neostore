var fs = require('fs');
var path = require('path');
const moment = require('moment');
const Handlebars = require("handlebars");
const pdf = require('html-pdf');
const getInvoiceHtml = require('../helpers/getInvoiceHtml.helper');
const productModel = require('../models/product.model')

async function checkForDuplicateAddress(userAddresses, newAddress) {
    let arrayLength = userAddresses.length;
    if(arrayLength >9)
        return true;
    for (let j = 0; j < arrayLength; j++) {
        if (userAddresses[j].address === newAddress.address)
            return true;
    }
    return false;
}

async function getProductDetails(productsRawData) {
    try {
        let arrayLength = productsRawData.length;
        let products = [];
        for (let j = 0; j < arrayLength; j++) {
            products.push({
                product: productsRawData[j].productName,
                seller: productsRawData[j].productSeller,
                color: productsRawData[j].productColor,
                quantity: productsRawData[j].orderQuantity,
                image: productsRawData[j].productImage,
                price: productsRawData[j].productPrice
            })
        }
        return products;
    } catch (error) {
        return error;
    }

}

async function generateInvoice(orderData) {
    const orderDate = moment(orderData.createdAt).format('DD/MM/YYYY, h:mm a');
    let html = await getInvoiceHtml.getHtml(orderData, orderDate);
    // console.log(html);

    // let html = fs.readFileSync(path.join(__dirname, "../assets/invoiceTemplate.html"), "utf8");
    let options = {
        format: "A4",
        orientation: "portrait",
        border: "5mm"
    }

    let username = orderData.userName.split(' ');
    let filename = `${username[0]}-${orderData.orderId}-invoice.pdf`;
    let invoicePath = path.join(__dirname, `../../invoices/${filename}`);

    let document = {
        html: html,
        data: { orderData },
        path: invoicePath,
        type: "", //defaults to pdf when given ""
    }

    let destination = await generatePDF(document, options);
    return ({ destination, filename });
}

async function generatePDF(document, options) {
    var html = Handlebars.compile(document.html)(document.data);
    let invoice = pdf.create(html, options);
    const file = await convertToPDF(document, invoice);

    return file;
}

async function convertToPDF(document, invoice) {
    const file = new Promise((resolve, reject) => {
        invoice.toFile(document.path, (err, data) => {
            if (err) {
                console.log(`err at invoiceData`);
                reject(err);
            }
            resolve(data);
        })
    })
    return file;

}

async function updateStock(allProducts) {
    let productCount = allProducts.length;

    for (let j = 0; j < productCount; j++) {
        let currentProduct = await productModel.findById(allProducts[j].productId);
        currentProduct.productStockCount -= allProducts[j].orderQuantity;
        
        currentProduct.save(currentProduct).then(data=>{
        }).catch(err => {
            return res.status(400).send({
                message: `Stock was not updated for ${currentProduct.productName}`
            })
        })
    }
    return true;
}


module.exports = { checkForDuplicateAddress, getProductDetails, generateInvoice, updateStock };