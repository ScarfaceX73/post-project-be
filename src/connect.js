const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

module.exports = {
    async connect() {
        try {
            const url = encodeURI(process.env.MONGODB_URL ?? "");
            console.log(url);
            const client = new MongoClient(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,
            });
            await client.connect();
            this.selectedDb = client.db("posts_db");
        } catch (err) {
            console.error(err);
        }
    }
}

