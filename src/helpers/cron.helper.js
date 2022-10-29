const cron = require('cron').CronJob;
const userModel = require('../models/user.model');

exports.nullifyResetCode = async (validTimeMinute, validTimeHour, validTimeDate, validTimeMonth,validTimeDay, userId) => {
    validTimeMonth -=1;
    console.log(`inside cron helper - `,validTimeHour, validTimeMinute, validTimeDate, validTimeMonth);
    const nullifyResetCodeCron = new cron(`${validTimeMinute} ${validTimeHour} ${validTimeDate} ${validTimeMonth} *`, async () => {
        let user = await userModel.findById(userId);
        user.resetCode = ``;
        user.save(user).then(data => {
            console.log(`reset code of ${data.firstName} ${data.secondName} has been nullified`);
            console.log('Next cron times ', nullifyResetCodeCron.nextDates(1));
        }).catch(err => {
            console.log(`error occurred while cron job`, err);
        })
    })
    nullifyResetCodeCron.start();
}