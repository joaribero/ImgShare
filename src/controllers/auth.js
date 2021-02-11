
const ctrl = {};

ctrl.signupPage = async (req,res,next) => {
    res.render('signup');
};

ctrl.signup = async (req,res,next) => {
    console.log(req.body)
    res.send('Received');
};

ctrl.signinPage = async (req,res,next) => {

};

ctrl.signin = async (req,res,next) => {

};

module.exports = ctrl;