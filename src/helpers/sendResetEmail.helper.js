const config = require('../config/default.json');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.APP.EMAIL_CONFIG.EMAIL,
        pass: config.APP.EMAIL_CONFIG.PASSWORD,
    },
});

async function sendResetCode(data) {
    try {
        var mailOptions = {
            from: 'Admin',
            to: `${data.receiverEmail}`,
            subject: `Reset Password`,
            html: `<h2>Here is your one time code to reset your password ${data.code}</h2>
                  <p>Use this link to reset your password: ${data.resetUrl}<p>
                  <p>This is a one time code valid till ${data.validTime} only.<p>`,
        };
    
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent for resetting password: %s", info.messageId);
        return true;
    } catch (error) {
        return error;
    }

}

module.exports = { sendResetCode }