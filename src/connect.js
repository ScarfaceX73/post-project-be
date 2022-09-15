const mongoose = require('mongoose');
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

module.exports = {
    async connect() {
        try {
            await mongoose.connect(process.env.MONGOOSE_URL,
                { useNewUrlParser: true, useUnifiedTopology: true },
                err => {
                    console.log('connected')
                })
        } catch (err) {
            console.error(err);
        }
    }
}

