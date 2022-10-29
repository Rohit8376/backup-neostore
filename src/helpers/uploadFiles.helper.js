const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/productImages/');
    },
    filename: (req, file, cb) => {
        let productColor = `none`, productName = 'none';
        if (!(req.body.color === undefined && req.body.productName === undefined)) {
            productColor = req.body.color;
            productName = req.body.productName;
        }
        const lengthOfExtension = -path.extname(file.originalname).length;
        const basename = productColor + '-' + productName;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, basename + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const uploadFiles = multer({
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
    limits: {
        fileSize: 2000000
    },
    storage: storage
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime type
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        return cb(null, false, new Error('goes wrong on the mimetype'));
    }
}

module.exports = uploadFiles;