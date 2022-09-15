const express = require("express");
const mongoose = require("./connect");
const postRouter = require("./router/post");
const dotenv = require("dotenv");
const { verifyUser } = require("./utils/firebase");

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect();

app.use((req, res, next) => {
    console.log(req?.method);
    let allowedOrigin = ["http://localhost:3000"];
    if (allowedOrigin.indexOf(req.headers.origin) != -1) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Set-Cookie, authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
    }
    next();
});

app.use(async (req, res, next) => {
    const userIdToken = req?.headers?.authorization;
    const isReqMethodOptions = req?.method === "OPTIONS";
    if (isReqMethodOptions) {
        next();
    } else {
        if (!userIdToken) {
            res.status(404).json({ error: "Not authenticated user" });
        } else {
            const userDetails = await verifyUser(req);
            if (userDetails) {
                next();
            } else {
                res.status(404).json({ error: "Not authenticated user" });
            }
        }
    }
});

app.use("/post", postRouter);

app.listen(process.env.PORT || 5000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
