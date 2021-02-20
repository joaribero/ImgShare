const ctrl = {};
const {Image,User} =require('../models');
const sidebar = require('../helpers/sidebar');
const image = require('../models/imageViewModel');

ctrl.index = async (req,res) => {
    //obtengo todas las imagenes de BDD, ordenadas ascendentes (=1)
    const images = await Image.find().sort({timestamp: -1});

    let viewModel;
    
    //Controlo que esté logueado para el primer ingreso.
    if (!(req.user === undefined)) {
        
        //Está logueado, entonces agrego el objeto al viewModel.
        const user = await User.findById(req.user.id);
        viewModel = {images: [], user};
        
    } else {
        viewModel = {images:[]};
    }
    
    //Agrego las imagenes que ya habia obtenido previamente.
    viewModel.images = images;

    //Ejecuto sidebar para obtener todos los datos
    viewModel = await sidebar(viewModel);
    //console.log(viewModel);
    
    res.render('index',viewModel);
};

module.exports = ctrl;