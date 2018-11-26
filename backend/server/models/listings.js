const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listingsSchema = new mongoose.Schema({
        title: { type: String },
        postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
        },
        visiblity: {
                type: String,
                enum: ['Public', 'Private', 'Group'],
                default: 'Public'
        },
        status: {
                type: String,
                enum: ['Open', 'Active', 'Closed'],
                default: 'Open'
            },
        description: { type: String },
        city: { type: String },
        countries: { type: String },
        states: { type: String },
        //     skills: [{
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: 'skills'
        //     }],
        skills: [{
                type: String
        }],
        isDeleted: { type: Boolean, default: false },
        
        groups: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'groups'
        }],
        startDate: {
                type: Date,
                default: Date.now
            },
            endDate: {
                type: Date,
                default: Date.now
            },
        // modifiedOn: [{
        //     lastBody: { type: String },
        //     datedOn: { type: Date, default: Date.now }
        // }] 
}, { timestamps: true });

const listings = mongoose.model('listings', listingsSchema);
module.exports = listings;