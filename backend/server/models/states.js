const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statesSchema = new mongoose.Schema({
    // states: {
    //     type: String
    // },
    states:[{
        id : {type :Number},
        country_id :  { type: String },
        name :  { type: String },
        
        }
        ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
},
}, { timestamps: true });

const users = mongoose.model('states', statesSchema);
module.exports = users;