const mongoose = require("mongoose");

const { UserModel } = require("./user.model");
let ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = mongoose.Schema({
    user: { type: ObjectId },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: ObjectId }],
    comments: [{
        user: { type: ObjectId },
        text: String,
        createdAt: Date
    }]
});

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel }