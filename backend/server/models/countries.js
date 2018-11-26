const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const countriesSchema = new mongoose.Schema({
    // countries: {
    //     type: String
    // },
    countries:[{
        id : {type :Number},
        sortname :  {type: String },
        name :  {type: String },
        phoneCode: {type: String}
        }
        ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
},
}, { timestamps: true });

const users = mongoose.model('countries', countriesSchema);
module.exports = users;