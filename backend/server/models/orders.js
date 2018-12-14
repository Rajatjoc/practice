const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ordersSchema = new mongoose.Schema({

    CustomerName : {
        type: String,
    },
    Product:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'masterproducts'
    },
    PhoneNo :{
        type : String
    },
    BillingAddress: {
        type: String,
       
    },
    ShippingAddress: {
        type: String,
        
    },
    isDeleted:{
        type : Boolean,
        default : false
    },
    OrderStatus :{type:String,default:'Active'}, // Active,InActive
}, { timestamps: true });

const orders = mongoose.model('orders', ordersSchema);
module.exports = orders;



