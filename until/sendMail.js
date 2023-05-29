"use strict";
require('dotenv').config({path: `../config/.env.development`})
const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const logger = require('../logger');

const clientID = process.env.TEST_CLIENT_ID
const redirectURL = process.env.TEST_REDIRECT_URL
let clientSecret = process.env.TEST_CLIENT_SECRET
let refreshToken = process.env.TEST_REFRESH_TOKEN
const oAuth2client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  redirectURL
);

oAuth2client.setCredentials({ refresh_token: refreshToken })

const sendMail = async (from, to, subject, text, fileData) => {
  try {
    const accessToken = await oAuth2client.getAccessToken();
    console.log(accessToken)

    const transport = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.TEST_USER,
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken
      }
    })

    let mailOptions = {
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: "<b>Error in Code Please solve it.</b>", // html body
      attachments: [
        {
          filename: fileData.filename,
          path: fileData.path,
          contentType: fileData.contentType
        }
      ]
    }
    let result = await transport.sendMail(mailOptions);
    return result
  } catch (error) {
    logger.warn(error)
    return error

  }
};

module.exports = sendMail