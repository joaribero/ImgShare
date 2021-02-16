const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('../helpers/libs');

const User =  require('../models/userViewModel');

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
    
    //Busco y verifico que no exista el username.
    const user = await User.findOne({username: username});
    if (user){
        //El username existe, envío mensaje de error
        return done(null, false, req.flash('signupMessage','This username already exists.'));
    }
    else {
        //Username no existe, sigo con el proceso de creación.
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);
        newUser.email = req.body.email;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        await newUser.save();
        done(null, newUser);
    }

}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // busco el user por username
    const user = await User.findOne({username: username});
    if (!user){
        //El username no existe
        return done(null, false, req.flash('LoginMessage','No user found.'));      
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword){
        //El username existe, pero la contraseña es incorrecta.
        return done(null, false, req.flash('LoginMessage','Incorrect Password'));
    }
    //Username y contraseña coinciden.
    done(null, user);
} ));