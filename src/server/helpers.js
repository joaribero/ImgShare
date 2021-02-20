const moment = require('moment');
const {User} = require('../models');

const helpers = {};

//Convierto el timestamp a una fecha amigable
helpers.timeAgo = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
};

helpers.toUpper = text => {
    return text.toUpperCase();
};

helpers.equals = (arg1, arg2) => {
    console.log(arg1 == arg2);
    return arg1 == arg2;
};

helpers.getUSer = async (arg1) => {
    const {username} = await User.findById(arg1); 
    return username;
}

helpers.getName = async (arg1) => {
    const {firstName} = await User.findById(arg1);
    return firstName;
}

module.exports = helpers;