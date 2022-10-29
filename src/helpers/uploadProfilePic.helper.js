const multer = require('multer');
const path = require('path');
// const userModel = require('../models/user.model');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/images/user/');
    },

    filename: (req, file, cb) => {
        let username = `none`;
        // const user = await userModel.findById(res.locals.userId);
        if (!(req.body.firstName === undefined)){
            username = req.body.firstName;
        }
        // if (!(user.firstName === undefined)){
        //     username = user.firstName;
        // }
        const lengthOfExtension = -path.extname(file.originalname).length;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, username + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const uploadPic = multer({
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    },
    limits: {
        fileSize: 2000000
    },
    storage: storage,
});

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

module.exports = uploadPic;