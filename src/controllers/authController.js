const passport = require('passport');
const ctrl = {};
require('../passport/local-auth');
const sidebar = require('../helpers/sidebar');

ctrl.signupPage = async (req,res,next) => {
    
    let viewModel = {}; 
    viewModel = await sidebar(viewModel);
    
    res.render('signup',viewModel);
};

ctrl.signup = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect:'/signup',
    passReqToCallback: true
}); 

ctrl.signinPage = async (req,res,next) => {
    
    let viewModel = {}; 
    viewModel= await sidebar(viewModel);

    res.render('signin',viewModel);
};

ctrl.signin = passport.authenticate('local-signin',{
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
});

ctrl.logOut = async (req, res, next) => {
    await req.logout();
    res.redirect('/');
};

module.exports = ctrl;