const express = require('express');
const router = express.Router();
const postModule = require('../modules/post');
const multer = require('multer');

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads')
    // },
    // filename: (req, file, cb) => {
    //     cb(null, file.fieldname + '-' + Date.now())
    // }

    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});

const upload = multer({ storage: storage });

router.get('/', postModule.getPost);

router.route('/create').post(upload.single('image'), postModule.createPost)

module.exports = router;