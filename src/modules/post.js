const postModel = require('../model/model');
const { getUserId } = require("../utils/firebase");
const fs = require('fs');


module.exports.createPost = async (req, res, next) => {
    const uId = await getUserId(req);
    const obj = {
        user_id: uId,
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    await postModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/get');
        }
    });

    // const new_post = new postModel;
    // new_post.img.data = fs.readFileSync(req.file.path)
    // new_post.img.contentType = 'image/jpeg';
    // new_post.save();
    // res.json({ message: 'New post added to the db!' });
}

module.exports.getPost = async (req, res, next) => {
    await postModel.find({}, (err, posts) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            // res.render('postPage', { posts: posts });
            res.contentType('json');
            res.send(posts);
        }

    }).sort({ createdAt: 'desc' });

    // });
}

