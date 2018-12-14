const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cmsPagesSchema = new mongoose.Schema({
    page_title: {
        type: String,
    },
    page_category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'categories'
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'categories'
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



