const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const skillsSchema = new mongoose.Schema({
    skill_name: [{
        type: String,
    }],
    description: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
},
}, { timestamps: true });

const skills = mongoose.model('skills', skillsSchema);
module.exports = skills;