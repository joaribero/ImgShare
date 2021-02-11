const moment = require('moment');

const helpers = {};

//Convierto el timestamp a una fecha amigable
helpers.timeAgo = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
};

helpers.toUpper = text => {
    return text.toUpperCase();
}

module.exports = helpers;