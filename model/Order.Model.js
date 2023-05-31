const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = mongoose.Schema({

    //## BILLING INFORMATION:
    userId: {
      type: Schema.Types.ObjectId,
      ref:"user",
      required: true
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    gst: {
      type: String,
      required: false,
    },

    //## PACK INFORMATION:
    packId: {
      type: Schema.Types.ObjectId,
      ref:"pack",
      required: true,
    },

    couponCode: {
      type: String,
      required: false,
    },

    couponDiscount: {
      type: Number,
      required: false,
    },

    discountTax: {
      type: Number,
      required: false,
      default: 0
    },
    discountTotal: {
      type: Number,
      required: false,
      default: 0
    },

    orderTotalTax: {
      type: Number,
      required: false,
      default: 0
    },

    orderTotal: {
      type: Number,
      required: false
    },

    status: {
      type: String,
      required: true,
      default: "Processing" //Pending Payment,Failed,Processing,On Hold,Completed,Canceled,Refunded
    },

    note: {
      type: String,
      required: false,
    },

    //## Payment Details
    paymentId: {
      type: Schema.Types.ObjectId,
      ref:"payment",
      required: true
    },

    paymentStatus: {
      type: String,
      required: true,
      default: "unpaid"
    },

    currency: {
      type: String,
      required: false,
      default: "INR"
    },
  

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


schema.virtual('pack', {
  ref: 'pack',
  localField: 'items.packId', 
  foreignField: '_id',
  justOne: true
});

const Order = mongoose.model("order", schema);

module.exports = Order;