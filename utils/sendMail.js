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

const cronSendMail = async (from, to, subject, name, errordata,  fileData) => {
  try {
    const accessToken = await oAuth2client.getAccessToken();
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
      html: `<div>\
      <p>Here is the Error information for ${name}</p>\
      <p><u>Data</u></p>
      <div>${JSON.stringify(errordata) || errordata}</div>
      <p><u>User Information are below</u></p>
      <p>Thank You</p>
      </div>`, // html body
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

module.exports = cronSendMail