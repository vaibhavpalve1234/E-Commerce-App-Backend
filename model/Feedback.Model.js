const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const feedbackSchema = Schema({

  userId:{
    type: Schema.Types.ObjectId,
    required: false,
    ref:"user",
  },
    message: {
      type: String,
      required: true
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

const Feedback = mongoose.model("feedback", feedbackSchema);

module.exports = Feedback;