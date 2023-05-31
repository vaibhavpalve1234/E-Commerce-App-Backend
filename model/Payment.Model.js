const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  brand: { //visa
    type: String,
    required: true,
  },
  pan: { //"4242424242424242"
    type: String,
    required: true,
  },
  expirationMonth: { //1
    type: Number,
    required: true,
  },
  expirationYear: { //2025
    type: Number,
    required: true,
  },
  cvv: { //123
    type: Number,
    required: true,
  }

});


const paymentSchema = Schema({
    userId: {
      type: String,
      required: true,
    },
    status: { //verified
      type: String,
      required: true,
      default: "unpaid"
    },
    gateway: {
      type: String,
      required: true,
      default: "razorpay"
    },
    method: {
      type: String,
      required: false,
      //default:"gateway"
    },
    token: {
      type: String,
      required: false,
    },
    razorpayPaymentId: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: false,
      default: "INR"
    },
    international: {
      type: Boolean,
      required: false,
      default: false
    },
    card: {
      type: cardSchema,
      required: false,
    }
  },

  {
    timestamps: true,

    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }

);

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;