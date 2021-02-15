const helpers = {};
const bcrypt = require('bcrypt-nodejs');

//función randomNumber (para los nombres de los archivos)
helpers.randomNumber = () => {
    //Declaro los posibles caracteres
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomNumber = 0;
    
    //Hago un for para obtener un nombre aleatorio hasta 6 caracteres(i)
    for (let i=0; i< 6; i++){
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));       
    }
    return randomNumber;
};


module.exports = helpers;