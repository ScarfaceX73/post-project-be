const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        maxLength: 255,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
});

const Post = new mongoose.model('Posts', postSchema, 'posts');
module.exports = Post;