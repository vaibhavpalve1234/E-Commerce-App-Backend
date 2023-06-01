var paytm_config = require('./payment/config').paytm_config;
var paytm_checksum = require('./payment/checksum.js');
var rn = require('random-number');

module.exports = {
	payment:(req, res, next)=>{
		res.render('./payments/payment')
	},
    generate_checksum: function(req,response){
        if(req.method == 'POST'){
			var paramarray = {};
			paramarray['requestType'] = 'payment'
			paramarray['MID'] = paytm_config.MID; //Provided by Paytm
			paramarray['ORDER_ID'] = 'ORDER_' + rn() ; //unique OrderId for every request
			paramarray['CUST_ID'] = 'CUST001';  // unique customer identifier 
			paramarray['INDUSTRY_TYPE_ID'] = paytm_config.INDUSTRY_TYPE_ID; //Provided by Paytm
			paramarray['CHANNEL_ID'] = paytm_config.CHANNEL_ID; //Provided by Paytm
			paramarray['TXN_AMOUNT'] = req.body.amount + '.00'; // transaction amount
			paramarray['WEBSITE'] = paytm_config.WEBSITE; //Provided by Paytm
			paramarray['PAYTM_FINAL_URL'] = paytm_config.PAYTM_FINAL_URL
			paramarray['CALLBACK_URL'] = `http://localhost:8080/api/v1/verify_checksum`;//Handle callback send by payment
			paramarray['EMAIL'] = 'vaibhavpalve1234@gmail.com'; // customer email id
			paramarray['MOBILE_NO'] = '7776090314'; // customer 10 digit mobile no.
			paytm_checksum.genchecksum(paramarray, paytm_config.PAYTM_MERCHANT_KEY, function (err, res) {
				console.log(res)
				response.render('./payments/checkout',{data:res})
			});
		}else{
			response.writeHead(200, {'Content-type' : 'text/json'});
			response.end();
		}
	},
	
	verify_checksum: function(request,response){
		if(request.method == 'POST'){
			if(paytm_checksum.verifychecksum(request.body, paytm_config.PAYTM_MERCHANT_KEY)) {
				console.log("true");
				response.render('./payments/conformation',{message: "Success"})
			}else{
				console.log("false");
				response.render('./payments/conformation',{message: "Payment Failed"})
			}			
		}
	}
};
