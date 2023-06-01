require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` })
const razorpay = require('razorpay')
const crypto = require("crypto");
const logger = require('../../../logger')
const { KEY, SECRET } = require('../config').razorpay
module.exports = {
    order: async (req, res, next) => {
        try {
            let { amount } = req.body
            var instance = new razorpay({ key_id: KEY, key_secret: SECRET })
            let order = await instance.orders.create({
                amount: amount,
                currency: "INR",
                receipt: "receipt#1",
                callback_url: "/payment-verify"
            })
            res.send(order)
        } catch (error) {
            logger.warn(error)
            next(error)
            res.send(error)
        }
    },
    verifyPayment: async (req, res, next) => {
        console.log("razorpayVerification start");

        const razorpayPaymentId = req.body.razorpay_payment_id;
        const razorpayOrderId = req.body.razorpay_order_id;
        const razorpaySignature = req.body.razorpay_signature;

        const shasum = crypto.createHmac("sha256", SECRET);
        shasum.update(razorpayOrderId + "|" + razorpayPaymentId);
        const digest = shasum.digest("hex");
        payment.status = status;
        payment.method = "online";
        payment.razorpayPaymentId = razorpayPaymentId;
    }
}