const moment = require('moment');

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

module.exports = helpers;