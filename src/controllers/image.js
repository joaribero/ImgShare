const path = require('path');
const { randomNumber } = require('../helpers/libs');
const helpers = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const {Image,Comment} = require('../models');

const ctrl = {};

ctrl.index = async (req,res) => {
    //Busco la imagen en la BDD con el nombre del parámetro. 
    const image = await Image.findOne({fileName: {$regex: req.params.image_id}});

    //Busco los comentaros de esa imagen.
    const comments = await Comment.find({image_id: image._id});
    
    //Renderizo la pagina y le envío el object para tener los datos.
    res.render('image',{image, comments});
};

ctrl.create = (req,res) => {
    //Creo una funcion recursiva, para no repetir nombres.
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({fileName: imgUrl});
        
        //Si el nombre random ya existe, vuelvo a ejectur la funcion hasta que no se vuelva a repetir
        if (images.lenght > 0) {           
            saveImage();

        } else { //el nombre no existe, continuo con el guardado.
            console.log(imgUrl);
        
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

            //Valido que la extensión del archivo sea de una imagen.
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                
                //Modifico la ruta de la imagen, de temp a upload
                await fs.rename(imageTempPath,targetPath);
                
                //Creo el objeto Image para mongo y después poder almacenarlo.
                const newImg = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    fileName: imgUrl+ ext
                });
                
                const imagedSave = await newImg.save();
                
                res.redirect('/images/' + imgUrl);

            }else { //No es una imagen, elimino lo que se haya subido y respondo error.
                
                await fs.unlink(imageTempPath);
                
                res.status(500).json({error: 'Only images are allowed'});
            }                   
        }             
    }
    //El create inicia acá, ejecutando la funcion recursiva.
    saveImage();

};

ctrl.like = (req,res) => {
    
};

ctrl.comment = async (req,res) => {
    //Busco la imagen en BDD que tenga el nombre.
    const image = await Image.findOne({fileName: {$regex: req.params.image_id}});
    
    //Si existe la imagen, continuo el proceso de guardar el comentario.
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        
        newComment.save();

        res.redirect('/images/'+ image.uniqueId);
    }
    
    
};

ctrl.remove = (req,res) => {
    
};

module.exports = ctrl;