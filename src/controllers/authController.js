const passport = require('passport');
const ctrl = {};
require('../passport/local-auth');

ctrl.signupPage = async (req,res,next) => {
    res.render('signup');
};

ctrl.signup = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect:'/signup',
    passReqToCallback: true
}); 

ctrl.signinPage = async (req,res,next) => {
    res.render('signin');
};

ctrl.signin = passport.authenticate('local-signin',{
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
});

module.exports = ctrl;