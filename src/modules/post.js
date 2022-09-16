const { getUserId } = require("../utils/firebase");
const mongo = require("../connect");

module.exports.createPost = async (req, res) => {
    try {
        const uId = await getUserId(req);
        const postDocument = {
            user_id: uId,
            ...(req?.body ?? {}),
        };
        console.log(postDocument);
        await mongo.selectedDb.collection("posts").insertOne(postDocument);
        res.status(200).send({ message: "Post added" });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.getPost = async (req, res, next) => {
    try {
        const uId = await getUserId(req);
        const postData = await mongo.selectedDb
            .collection("post")
            .find({ user_id: { $eq: uId } })
            .toArray();
        res.send(postData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
