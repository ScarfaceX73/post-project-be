const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        maxLength: 255,
        required: true
    },
});

const Post = new mongoose.model('Posts', postSchema, 'posts');
module.exports = Post;