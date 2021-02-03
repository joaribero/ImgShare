const {Comment,Image} = require('../models');

async function imagesCounter(){
    return await Image.countDocuments();
}

async function commentsCounter (){
    return await Comment.countDocuments();
}

async function imageTotalViewsCounter() {
    
    //Agrupo todas las imagenes y sumo las views de cada una.
    const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}]);

    //Me retorna un objeto tengo que buscar el primer valor.
    return result[0].viewsTotal;
}

async function likesTotalCounter() {
    
    //De la misma forma que el contador de vistas, hago el contador de likes.
    const result = await Image.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}]);
    return result[0].likesTotal;
}

module.exports = async () => {
    
    //Uso una promesa para ejecutar todas las funciones.
    const results = await Promise.all([
        imagesCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])

    //Retorno results como objeto para poder identificarlo mejor.
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}