const mongoose = require("mongoose");

const { PostModel } = require("./post.model");
let ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: ObjectId }],
    friends: [{ type: ObjectId }],
    friendRequests: [{ type: ObjectId }]
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel }