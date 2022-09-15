const express = require('express');
const router = express.Router();
const postModule = require('../modules/post');

router.get('/', postModule.getPost);

router.post('/create', postModule.createPost);

module.exports = router;