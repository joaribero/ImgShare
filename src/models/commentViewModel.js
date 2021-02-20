const mongoose =  require('mongoose');
const {Schema,model} = mongoose;
const ObjectId = Schema.ObjectId;
const currentUser = require('./userViewModel');


const CommentSchema = new Schema({

    gravatar: {type: String},
    comment: {type: String},
    timestamp: {type: Date, default: Date.now},
    image_id: {type: ObjectId},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

CommentSchema.virtual('image')
    .set(function (image){
        this._image = image;
    })
    .get(function (){
        return this._image;
    });

CommentSchema.virtual('usern')
    .get(async function () {
        const u = this.user;
        const {username} = await currentUser.findById(u);
        const display = username;
        console.log(display);
        return display;
    });

module.exports = model('Comment', CommentSchema);
