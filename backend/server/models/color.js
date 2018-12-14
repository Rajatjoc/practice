const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const colorSchema = new mongoose.Schema({
    name: {
        type: String
    },
}, { timestamps: true });

const colors = mongoose.model('colors', colorSchema);

module.exports = colors; 


