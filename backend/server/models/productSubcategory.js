const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSubcategorySchema = new mongoose.Schema({
    title: {
        type: String
       
    } ,
    isDeleted:{
        type : Boolean,
        default : false
    },
    status:{
        type:Boolean,
        default:true
    },
    hasSubcategory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productSubcategories'
    }]
}, { timestamps: true });

const productSubcategories = mongoose.model('productSubcategories', productSubcategorySchema);
module.exports = productSubcategories;