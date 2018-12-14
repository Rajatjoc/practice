const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var masterProductsSchema = new mongoose.Schema({
    product_name: { type: String, index: true},
    available: {type: Boolean},
    description: {type: String},
    stars: {type: Number},
    images: [{type : String}],
    videos:[{type: String}],
    counts: {type: Number},
    count_prices: {type: Number},
    createdAt: {type: Date},
    product_type: {type: Number},
    tag_relevance: [{
        tag_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tagmodels'
        },
        relevance: { type: Number }
    }],
    
    variants:[{
       
        country:{ type: mongoose.Schema.Types.ObjectId,
            ref: 'countries'
        },
        size: { type: mongoose.Schema.Types.ObjectId,
            ref: 'sizes'
        },
        color:{type: mongoose.Schema.Types.ObjectId,
            ref: 'colors'
        },
        price: {type: Number},
        count: {type: Number}
       
    }],
    status: {
        type: Boolean,
        default : true
    },
    available: {
        type: Boolean,
        default: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productcategories'
    },
    sub_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productcategories'
    },
    deepsub_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productcategories'
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands'
    },
    //retailers_count:{ type: Number, default: 0 }, 
    //retailerId: [{
     //   type: mongoose.Schema.Types.ObjectId,
       // ref: 'retailers',
       // unique: true
    //}],
    isDeleted : {type : Boolean , default : false},
    reviews: { type: Number, default: 0 },
    admin_comment: { type: String },
    price_alerts: {type: Number, default: 0},
//  retailerproducts_count: {type: Number, default: 0}
}, { timestamps: true });

var masterproducts = mongoose.model('masterproducts', masterProductsSchema);
module.exports = masterproducts;