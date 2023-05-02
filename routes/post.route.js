const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const { PostModel } = require("../models/post.model");


const postRouter = express.Router();

postRouter.get("/posts", async (req, res) => {
    try {
        let posts = await PostModel.find();
        res.json(posts);
    } catch (error) {
        res.json(error);
    }
})

postRouter.get("/posts/:id", async (req, res) => {
    try {
        let posts = await PostModel.find({ _id: req.params.id });
        res.json(posts);
    } catch (error) {
        res.json(error);
    }
})

postRouter.post("/posts", async (req, res) => {
    try {
        let { text, image } = req.body;
        let user = req.body.userID;
        let createdAt = new Date().toJSON();
        let post = new PostModel({ user, text, image, createdAt });
        await post.save();
        res.json("post has been posted successfully");
    } catch (error) {
        res.json(error);
    }
})

postRouter.patch("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let { text, image } = req.body;
        let post = await PostModel.findOne({ _id: id });
        if (text) post.text = text;
        if (image) post.image = image;
        await PostModel.findByIdAndUpdate({ _id: id }, post);
        res.json("post has been updated successfully");
    } catch (error) {
        res.json(error);
    }
})

postRouter.delete("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await PostModel.findByIdAndDelete({ _id: id });
        res.json("post has been deleted successfully");
    } catch (error) {
        res.json(error);
    }
})

postRouter.post("/posts/:id/like", async (req, res) => {
    try {
        const id = req.params.id;
        const myId = req.body.userId || req.body.userID;
        let post = await PostModel.findOne({ _id: id });
        post.likes.push(myId);
        await PostModel.findByIdAndUpdate({ _id: id }, post);
        res.json("post has been liked successfully");
    } catch (error) {
        res.json(error);
    }
})

postRouter.post("/posts/:id/comment", async (req, res) => {
    try {
        const id = req.params.id;
        const myId = req.body.userId || req.body.userID;
        let obj = {
            user: myId,
            text: req.body.text,
            createdAt: new Date().toJSON()
        }
        let post = await PostModel.findOne({ _id: id });
        post.comments.push(obj);
        await PostModel.findByIdAndUpdate({ _id: id }, post);
        res.json("comment added to the post successfully");
    } catch (error) {
        res.json(error);
    }
})

module.exports = { postRouter }
