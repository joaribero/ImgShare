const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User =  require('../models/user');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null,user);
});

passport.use('local-signup',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req, username, password, done) => {
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    done(null, user);
}));