const mongoose = require('mongoose');
const {Schema} = mongoose;

const likeSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    }
});

module.exports = mongoose.model('likes',likeSchema);