const jwt = require('jsonwebtoken');
const userData = require('../models/user.model');
const secretKey = require('../config/auth.config');
const bcrypt = require('bcrypt');
const cartModel = require(`../models/cart.model`);


//generate token when user is registred or logged in using either ways
exports.generateToken = async (req, res) => {
    let userId = await res.locals.currentUser.userId;
    let cartId = await res.locals.currentUser.cartId;
    var token = jwt.sign({
        id: userId,
        type: `customer`
    },
        secretKey.secret, { expiresIn: 3000 });
    if (!token) {
        return res.status(400).json({
            message: `User not authenticated!`,
        })
    }
    res.locals.currentUser.message += ` Token generated!`
    console.log(`token generated`);
    console.log({
        message: res.locals.currentUser.message,
        userId,
        cartId,
        token
    })


    
    return res.status(200).send({
        message: res.locals.currentUser.message,
        userId,
        cartId,
        token
    })
}

//verify token for each api request
exports.verifyToken = async (req, res, next) => {
    let bearerToken = await req.headers["authorization" || 'Authorization'];
    if (!bearerToken) {
        console.log(`no token`);
        return res.status(403).json({
            message: "No token provided - User is not authorized!"
        })
    }
    let bearerTokenParts = bearerToken.split(' ');
    let token = bearerTokenParts[1];
    jwt.verify(token, secretKey.secret, (err, result) => {
        if (err) {
            console.log("Token invalid");
            res.status(403).json({ message: "Unauthorized", token: 'Invalid' })
            return;
        }
        else {
            res.locals.userId = result.id;
            next();
        }
    })
}


/**
 * exports.generateTokenSSO = async (req, res, next) => {
    let user = JSON.parse(req.query.user);
    let username = await user.displayName;
    let profilePic = await user.picture;
    let SSOprovider = await user.provider;
    let email = await user.email;

    let messsage = `User authenticated and token generated`;

    userData.find({ email }, (err, user) => {
        if (user.length !== 0) {
            res.locals.currentUser = {
                messsage,
                userId: user[0].id,
                email: user[0].email,
                cartId: user[0].cartId
            }
            next();
        }
        else {
            let usernameArray = username.split(' ');
            message=`User registered successfully!`;

            let newUser = new userData({
                firstName: usernameArray[0],
                secondName: usernameArray[1],
                email,
                profile_pic: {
                    filename: profilePic
                },
                SSOprovider
            })
            const newCart = new cartModel({
                userId: newUser._id,
                userEmail: newUser.email
            })
            newUser.cartId = newCart._id;

            newUser.save(newUser).then(data => {
                newCart.save(newCart).then(() => {
                    res.locals.currentUser = {
                        userId: data.id,
                        email: data.email,
                        cartId: data.cartId
                    }
                    next();
                })
            })
        }
    })
}
 */

/**
 * exports.generateToken = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    userData.find({ email }, (err, user) => {
        if (err || user.length === 0) {
            return res.status(400).send({
                message: `User Not Found! Check username and try again\n Error: ${err}`
            })
        }
        var passwordMatch = bcrypt.compareSync(password, user[0].password);
        if (!passwordMatch) {
            return res.status(400).send({
                message: `Credentials not valid, enter correct password`
            })
        }
        var token = jwt.sign({
            id: user[0]._id,
            type: `customer`
        },
            secretKey.secret, { expiresIn: 3000 });
        if (!token) {
            return res.status(400).json({
                message: `User not authenticated!`,
            })
        }
        res.locals.currentUser = { id: user[0].id, email: user[0].email, token };
        next();
    })
}

 */