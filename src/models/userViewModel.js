const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

//Third party login (facebook, twitter, google, etc..)
const ThirdPartyProviderSchema = new Schema({
    provider_name: {
        type: String,
        default: null
    },
    provider_id: {
        type: String,
        default: null
    },
    provider_data: {
        type: {},
        default: null
    }
});

const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    date: {type: Date, default: Date.now},
    appId: [ThirdPartyProviderSchema]
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users',userSchema);