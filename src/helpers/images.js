const {Image} = require('../models');

module.exports = {

    //Retorno las 9 imagenes más populares ordenadas por likes.
    async popular() {
        const images = await Image.find()
            .limit(9)
            .sort({likes: -1});
        return images;
    }
};