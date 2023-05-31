require('dotenv').config({path: `config/.env.${process.env.NODE_ENV}`});
module.exports = {
  paytm_config: {
		MID: process.env.MID,// Provided by Paytm
		WEBSITE: 'WEBSTAGING',
    CHANNEL_ID: 'WEB',
    INDUSTRY_TYPE_ID: 'Retail',
    PAYTM_MERCHANT_KEY : process.env.PAYTM_MERCHANT_KEY// Provided by Paytm
	}
}