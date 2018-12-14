const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        unique : true
        
    },
    sub_category:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'categories'
        }
    ] ,
    parent : {
        type:Boolean,
        default:false
    },
    isDeleted:{
        type : Boolean,
        default : false
    }
}, { timestamps: true });

const categories = mongoose.model('categories', categorySchema);
module.exports = categories;