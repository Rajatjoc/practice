const mongoose = require('mongoose');
SALT_WORK_FACTOR = 10;
bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: true
        },
        lastName: {
                type: String,
                required: true
        },
        verifyLinkHash: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                unique: true,
                validate: {
                        validator: function (v) {
                                return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(v);
                        },
                        message: props => `${props.value} is not a valid email!`
                },
        },
        verifyHashForgetPassword: {
                type: String,
        },
        dob: {
                type: Date
        },
        stripeEmail: {
                type: String,
                trim: true,
                lowercase: true,
        
            },
            accoutKey: {
                type: String,
            },
        password: {
                type: String,
                required: true
        },
        business_name: {
                type: String,
                required: false,
            },
            business_phone: {
                type: String,
            
        },
        skill_name: [{
                type: String,
            }],
            description: {
                type: String
            },
        role_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'roles',
                required: true
        },
        skill_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'skills'
        },
        business_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'businesses'
        },
        stripeDetails: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'stripeDetails'
        },
        active: {
                type: Boolean, default: false
        },
        phone: {
                type: String
        },
        bio: {
          type : String
        },
        deleted: {
                type: Boolean, default: false
        },
        disabled: {
                type: Boolean, default: false
        },
        profileImage: {
                type: String
        },
        is_loggedin: {
                type: Boolean
        },
        country: {
                type: String
        },
        state: {
                type: String
        },
        city: {
                type: String
                
        },
        token:{
                type:String
        },
        image: {
                type: String,
                default: null
            },
            image_thumbnail: {
                type: String,
                default: null
            },

        
        // modifiedOn: [{
        //     lastBody: { type: String },
        //     datedOn: { type: Date, default: Date.now }
        // }] 
}, { timestamps: true });

userSchema.pre('save', function (next) {
        
        var user = this;
        if (!user.isModified('password')) {
                return next();
        }
        bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                        user.password = hash;
                        next();
                });
        });
});


const users = mongoose.model('users', userSchema);
module.exports = users;

