const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentModeSchema = new mongoose.Schema({
    paymentMode: {
        type: String
       
    } ,
    status:{
        type : Boolean,
        default : true
    },
    isDeleted:{
        type : Boolean,
        default : false
    }
}, { timestamps: true });

const paymentmodes = mongoose.model('paymentmodes', paymentModeSchema);
module.exports = paymentmodes;