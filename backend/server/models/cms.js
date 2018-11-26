const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cmsPagesSchema = new mongoose.Schema({
    page_title: {
        type: String,
        unique : true
    },
    page_category: {
        type: String,
    },
    sub_category: {
        type: String,
        unique : true
    },
    content:{
        type : String
    },
    isDeleted:{
        type : Boolean,
        default : false
    },
    status:{type:String,default:'Active'}, // Active,InActive
}, { timestamps: true });

const cmsPages = mongoose.model('cmsPages', cmsPagesSchema);
module.exports = cmsPages;



