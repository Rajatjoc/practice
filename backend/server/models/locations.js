const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationsSchema = new mongoose.Schema({
    country: { 
        type: String,
        required: true
    },
    State: { 
        type: Number,
        enum : [ 1 , 2 ],
        default: 2
    }
}, { timestamps: true });

const locations = mongoose.model('locations', locationsSchema);
module.exports = locations;