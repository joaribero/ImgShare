const path = require('path');
const { randomNumber } = require('../helpers/libs');
const helpers = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const {Image,Comment,User} = require('../models');
const sidebar = require('../helpers/sidebar');

const ctrl = {};

ctrl.index = async (req,res) => {
    
    const user = await User.findById(req.session.passport.user)

    //ViewModel que voy a enviar a la vista.
    let viewModel = {image: {}, comments: {}, user};

    //Busco la imagen en la BDD con el nombre del parámetro. 
    const image = await Image.findOne({fileName: {$regex: req.params.image_id}});
    
    //Verifico que exista la imagen
    if (image){
        //Incremento las vistas cada vez que ingreso.
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save()

        //Busco los comentarios de esa imagen.
        const comments = await Comment.find({image_id: image._id});
        viewModel.comments = comments;

        //Ejecuto sidebar y lo agrego al view model.
        viewModel = await sidebar(viewModel);

        //Renderizo la pagina y le envío el object para tener los datos.
        res.render('image',viewModel);
    } else {
        res.redirect('/');
    }

    
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
                    fileName: imgUrl+ ext,
                    user: req.session.passport.user
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

ctrl.like = async (req,res) => {
    //Busco la imagen por el id que viene en la url.
    const image = await Image.findOne({fileName: {$regex: req.params.image_id}});
    
    //Valdo que exista.
    if (image){
        //Aumento el contador de likes y guardo en BDD.
        image.likes = image.likes + 1;
        await image.save();
        
        //Retorno la cantidad de likes para mostrarlo mediante ajax.
        res.json({likes: image.likes});  
    } else {
        res.status(500).json({error: 'Internal Error'});    
    }
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
    else {
        res.redirect('/');
    }
    
};

ctrl.remove = async (req,res) => {
    const image = await Image.findOne({fileName: {$regex: req.params.image_id}});
    if (image){
        await fs.unlink(path.resolve('./src/public/upload/' + image.fileName));
        await Comment.deleteOne({image_id: image._id});
        await image.remove();
        res.json(true);
    }
};

module.exports = ctrl;