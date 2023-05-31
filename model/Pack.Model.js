const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packSchema = Schema({

  name: { //
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    default:"starter",//business
    required: true,
  },

  regularPrice: { //300
    type: Number,
    required: true,
  },

  salePrice: { // 250
    type: Number,
    required: true,
  },

  days:{
    type: Number,
    required: true,
    default:0
  },
 
},

{
  timestamps:true,

  toJSON: {
      virtuals:true
  },
  toObject: {
     virtuals:true
}
}

);

const Pack = mongoose.model("pack", packSchema);

module.exports = Pack;
