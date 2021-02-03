const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel => {

    //Ejecuto las funciones de cada helper
    const results = await Promise.all([
        Stats(),
        Images.popular(),
        Comments.newest()
    ])
    
    //Almaceno todo en un objeto del viewModel
    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    }

    return viewModel;
}