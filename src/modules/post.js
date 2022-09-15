const postModel = require('../model/model');
const { getUserId } = require("../utils/firebase");
const fs = require('fs');


module.exports.createPost = async (req, res, next) => {
    const postData = new postModel({ ...req.body.product });
    try {
        const createdResponse = await postData.save();
        res.send(createdResponse)
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports.getPost = async (req, res, next) => {
    try {
        const post = await postModel.find();
        res.send(post)
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

