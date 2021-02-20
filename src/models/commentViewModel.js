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

CommentSchema.virtual('usern',{
    ref: 'users',
    localField: 'user',
    foreignField: '_id'
});

CommentSchema.set('toObject', {virtuals: true});
CommentSchema.set('toJson', {virtuals: true});

module.exports = model('Comment', CommentSchema);
