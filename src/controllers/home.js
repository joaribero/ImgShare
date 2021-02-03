const ctrl = {};
const {Image} =require('../models');
const sidebar = require('../helpers/sidebar');
const image = require('../models/image');

ctrl.index = async (req,res) => {
    //obtengo todas las imagenes de BDD, ordenadas ascendentes (=1)
    const images = await Image.find().sort({timestamp: -1});
    
    //Declaro el viewModel con las imagenes.
    let viewModel = {images: []};
    
    //Agrego las imagenes que ya habia obtenido previamente.
    viewModel.images = images;

    //Ejecuto sidebar para obtener todos los datos
    viewModel = await sidebar(viewModel);
    //console.log(viewModel);
    
    res.render('index',viewModel);
};

module.exports = ctrl;