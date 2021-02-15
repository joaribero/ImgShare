const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
        await newUser.save();
        done(null, newUser);
    }

}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = User.findOne({username: username});
    if (!user){
        return done(null, false, req.flash('signinMessage','No user found.'));
    }
    if (!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage','Incorrect Password'));
    }
    done(null, user);
} ));