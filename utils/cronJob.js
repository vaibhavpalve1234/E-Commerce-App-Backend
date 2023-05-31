require('dotenv').config({path: `../config/.env.development`})
const cron = require('node-cron');
const logger = require('../logger');
const UserModel = require('../model/User.Model');
const {cronSendMail} = require('./sendMail');
const {asyncForEach} = require('./asyncForEach');
const { makeYesterday } = require('./dateFormate');

cron.schedule("0 6 * * *", async()=>{
    console.log("------------------------------------------SEND ERROR MAIL--------------------------------------------------------------")
    let mails = []
    try {
        let userMails = await UserModel.find({ role: { $in: [ "admin" ] } })
        await asyncForEach(userMails,(i)=>{
            return mails.push(i.email)
        })
        let fileData = {
            filename:'logger.txt', path: `${__dirname}/.././public/logger/application_${makeYesterday()}.log`, contentType:'application/type'
        }
        let result = await cronSendMail(process.env.TEST_USER, mails, "Error files ", "error", {msg:`${mails}`}, fileData);
        if(result?.res?.status === "200"){
            logger.warn(`mails sent succefully with reports to there recepients ${JSON.stringify(mails)}`)
        }
        else{
            logger.warn(`mails sent failed with reports to there recepients ${JSON.stringify(mails)}`)
        }
    } catch (error) {
        console.log(error);
        logger.warn("Mail Error: " + error)
    }

})