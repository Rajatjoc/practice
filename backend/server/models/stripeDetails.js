const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stripeDetailsSchema = new mongoose.Schema({
    stripeEmail: {
        type: String,
        trim: true,
        lowercase: true,
        // validate: {
        //         validator: function (v) {
        //                 return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(v);
        //         },
        //         message: props => `${props.value} is not a valid email!`
        // },
    },
    accoutKey: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
},
    // modifiedOn: [{
    //     lastBody: { type: String },
    //     datedOn: { type: Date, default: Date.now }
    // }] 
}, { timestamps: true });

const stripeDetails = mongoose.model('stripeDetails', stripeDetailsSchema);
module.exports = stripeDetails;