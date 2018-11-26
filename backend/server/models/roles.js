const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rolesSchema = new mongoose.Schema({
    roleName: { 
        type: String,
        enum : ['admin','user'],
        default: 'user'
    },
    roleId: { 
        type: Number,
        enum : [ 1 , 2 ],
        default: 2
    },
    description: { type: String },
}, { timestamps: true });

const roles = mongoose.model('roles', rolesSchema);
module.exports = roles;