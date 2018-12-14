const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productCategorySchema = new mongoose.Schema({
    title: {
        type: String
       
    } ,
    parent:{type : Boolean,default : false}
    ,
    sub_category : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productcategories'
    }],
    isDeleted:{
        type : Boolean,
        default : false
    }
}, { timestamps: true });

const productcategories = mongoose.model('productcategories', productCategorySchema);
module.exports = productcategories;