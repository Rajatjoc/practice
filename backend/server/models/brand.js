const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const brandSchema = new mongoose.Schema({
    title: {
        type: String
       
    } ,
    isDeleted:{
        type : Boolean,
        default : false
    }
}, { timestamps: true });

const brands = mongoose.model('brands', brandSchema);
module.exports = brands;