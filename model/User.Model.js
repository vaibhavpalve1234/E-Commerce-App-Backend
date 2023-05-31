const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        unique:false,
    },
    role: {
        type: String,
        enum: ['admin', 'user','reseller'],
        default: 'user'
      },
    password:{
        type:String,
        required:true,
    },
}, {timestamps: true});

//Export the model
module.exports = mongoose.model('User', userSchema);
