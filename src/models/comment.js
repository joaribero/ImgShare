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

module.exports = model('Comment', CommentSchema);
