const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index');
const errorHandler = require('errorhandler');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const {database} = require('../keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = app => {
    
    //Settings
    app.set('port',process.env.PORT || 3000);

    app.set('views',path.join(__dirname,'../views'));

    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'),'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
    
    app.set('view engine','.hbs');
    
    //Middlewares
    app.use(morgan('dev')); //morgan para el log

    app.use(multer({  //multer para subir archivos de forma simple
        dest: path.join(__dirname, '../public/upload/temp')
    }).single('image'));

    app.use(express.urlencoded({
        extended: false
    }));

    app.use(express.json());
    app.use(session({
        secret: 'jribero',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }));

    app.use(flash()); // connect-flash

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        app.locals.signupMessage = req.flash('signupMessage');
        app.locals.loginMessage = req.flash('LoginMessage');
        next();
    });

    //Routes
    routes(app);

    //Static files
    app.use('/public', express.static(path.join(__dirname,'../public')));

    //Error handlers
    if ('deveplopement' === app.get('env')){
        app.use(errorHandler);
    }

    return app;
}