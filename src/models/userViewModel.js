const mongoose = require('mongoose');
const path = require('path');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    username: {type: String},
    appId: {type: String}
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users',userSchema);