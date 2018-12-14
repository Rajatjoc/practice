const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const countriesSchema = new mongoose.Schema({
    name: {
        type: String
    },

}, { timestamps: true });

const countries = mongoose.model('countries', countriesSchema);

module.exports = countries; 


