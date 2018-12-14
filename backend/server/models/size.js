

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sizeSchema = new mongoose.Schema({
    sizeName: {
        type: String
    },
    measurement:[{
        typeOfsize:{ type: String,
            enum : ['length','width','height'],
          
            default : null}, 
        sizeValue : { type:Number }, // size in number
        sizetype:{type:String},  // inc or cm
    }],
    subCategory:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'productcategories'
    },
     Category:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'productcategories'
    },
    country :[{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'countries'
    }],
    isDeleted:{
        type : Boolean,
        default : false
    },
    
}, { timestamps: true });

const sizes = mongoose.model('sizes', sizeSchema);

module.exports = sizes; 


