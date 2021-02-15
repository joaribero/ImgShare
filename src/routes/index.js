const express = require('express');
const router = express.Router();

const home = require('../controllers/homeController');
const image = require('../controllers/imageController');
const auth = require('../controllers/authController');

module.exports = app => {
    router.get('/',home.index);
    router.get('/images/:image_id',image.index);
    router.post('/images',image.create);
    router.post('/images/:image_id/like',image.like);
    router.post('/images/:image_id/comment',image.comment);
    router.delete('/images/:image_id',image.remove);
    router.get('/signup', auth.signupPage);
    router.post('/signup',auth.signup);
    router.get('/signin',auth.signinPage);
    router.post('/signin',auth.signin);

    app.use(router);
};