require('dotenv').config({ path: `config/.env.${process.env.NODE_ENV}` });
module.exports = {
  paytm: {
    MID: process.env.MID,// Provided by Paytm
    WEBSITE: process.env.WEBSITE,
    CHANNEL_ID: process.env.CHANNEL_ID,
    INDUSTRY_TYPE_ID: process.env.INDUSTRY_TYPE_ID,
    PAYTM_MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY,// Provided by Paytm
    REQUEST_TYPE: process.env.REQUEST_TYPE,
    PAYTM_FINAL_URL : process.env.PAYTM_FINAL_URL
  }, 
  razorpay:{
    KEY : process.env.RAZORPAY_API_KEY,
    SECRET : process.env.RAZORPAY_API_SECRET 
  }
}