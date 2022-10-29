const express = require('express');
require('./db/mongoose');
const multer = require('multer');
const passport = require('passport');
require('./config/passport.config');
const swaggerUi = require("swagger-ui-express");
const path = require('path');

//Importing routers
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/products.router');
const productDefaultDataRouter = require('./routers/productDefaultData.router');
const cors = require('cors')
const app = express();

app.use(
    cors({ 
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );

//   app.use(cors())  
app.use(express.json());

//passport for SSO integration
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static('uploads'))





//importing swagger json file and serving the same
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(require(path.resolve(`${__dirname}/../swagger/swagger.json`)))
);

//Using routers
app.use(userRouter);
app.use(productDefaultDataRouter);
app.use(productRouter);


//User authentication using Google
app.get('/googleAuth', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/loginWithGoogle?user=' + JSON.stringify(req.user));
    });

//User authentication using Facebook
app.get('/facebookAuth', passport.authenticate('facebook', {
    scope: 'email'
}));

app.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/loginWithFacebook?user=' + JSON.stringify(req.user));
    });

//Error Handler
app.use(function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        return res.status(418).send({ message: 'File is too large or needs to be in jpg/png/jpeg format' });
    }
    console.log(err)
    res.status(500).send({
        message: 'Something broke!',
        err
    })
})

//homepage
app.get('/', (req, res) => {
    res.send('Homepage');
});

module.exports = app;