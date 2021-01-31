const ctrl = {};
const {Image} =require('../models');

ctrl.index = async (req,res) => {
    //obtengo todas las imagenes de BDD, ordenadas ascendentes (=1)
    const images = await Image.find().sort({timestamp: -1});

    res.render('index',{images});
};

module.exports = ctrl;