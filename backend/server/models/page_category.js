const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pageCategorySchema = new mongoose.Schema({
  
    category_title: {
        type: String,
    },
    isDeleted:{
        type : Boolean,
        default : false
    }
}, { timestamps: true });

const category = mongoose.model('category', pageCategorySchema);
module.exports = category;



