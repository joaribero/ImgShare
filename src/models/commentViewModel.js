const {Schema, model} =  require('mongoose');
const ObjectId = Schema.ObjectId;


const CommentSchema = new Schema({
    email: {type: String},
    name: {type: String},
    gravatar: {type: String},
    comment: {type: String},
    timestamp: {type: Date, default: Date.now},
    image_id: {type: ObjectId}
});

CommentSchema.virtual('image')
    .set(function (image){
        this._image = image;
    })
    .get(function (){
        return this._image;
    });

module.exports = model('Comment', CommentSchema);
