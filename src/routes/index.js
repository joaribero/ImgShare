const express = require('express');
const router = express.Router();

const home = require('../controllers/homeController');
const image = require('../controllers/imageController');
const auth = require('../controllers/authController');
const { isLoggedIn, isNotLoggedIn } = require('../helpers/auth');

module.exports = app => {
    //Para ingresar o ver las imagenes, no es necesario estar logueado.
    router.get('/',home.index);
    router.get('/images/:image_id',image.index);

    //Para el tratamiento de imagenes, es necesario loguearse antes.
    router.post('/images', isLoggedIn, image.create);
    router.post('/images/:image_id/like', isLoggedIn, image.like);
    router.post('/images/:image_id/comment', isLoggedIn, image.comment);
    router.delete('/images/:image_id', isLoggedIn, image.remove);
    router.get('/images/:image_id/isliked',isLoggedIn, image.isLiked);
    
    // Para registrarse o loguearse, no debe estar logueado previamente. 
    router.get('/signup', isNotLoggedIn, auth.signupPage);
    router.post('/signup', isNotLoggedIn, auth.signup);
    router.get('/signin', isNotLoggedIn, auth.signinPage);
    router.post('/signin', isNotLoggedIn, auth.signin);
    
    //Para desloguearse, debe estar logueado previamente.
    router.get('/logout', isLoggedIn, auth.logOut);

    app.use(router);
};