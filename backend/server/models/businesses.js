const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const businessesSchema = new mongoose.Schema({
    business_name: {
        type: String,
        required: false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
},
    business_phone: {
        type: String,
        // lowercase: true,
        // unique: true,
        // validate: {
        //         validator: function (v) {
        //                 return /\d{3}-\d{3}-\d{4}/.test(v);
        //         },
        //         message: props => `${props.value} is not a valid phone!`
        // },
},
    // modifiedOn: [{
    //     lastBody: { type: String },
    //     datedOn: { type: Date, default: Date.now }
    // }] 
}, { timestamps: true });

var businesses = mongoose.model('businesses', businessesSchema);
module.exports = businesses;