const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { authenticate } = require("../middlewares/authenticate.middleware");
const { UserModel } = require("../models/user.model");


const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
    try {
        let users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
})

userRouter.post("/register", async (req, res) => {
    let { name, email, password, dob, bio } = req.body;
    try {
        dob = new Date(dob);
        bcrypt.hash(password, 5, async (err, hashed_password) => {
            if (hashed_password) {
                let user = new UserModel({ name, email, password: hashed_password, dob, bio });
                await user.save();
                res.status(201).json("user registered successfully");
            } else {
                res.json(err);
            }
        });

    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    if (email && password) {
        let user = await UserModel.findOne({ email });
        if (user) {
            hashed_password = user.password;
            try {
                bcrypt.compare(password, hashed_password, async (err, result) => {
                    if (result) {
                        let token = jwt.sign({ userID: user._id }, process.env.key);
                        res.status(201).json({ status: "Login Successfull", token });
                    } else {
                        res.json("incorrect password");
                    }
                })
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        }
        else res.json("no users found create a new user");
    } else {
        res.json("enter valid credentials or register first");
    }
})

userRouter.use(authenticate);

userRouter.get("/users/:id/friends", async (req, res) => {
    try {
        const id = req.params.id;
        let users = await UserModel.findOne({ _id: id });
        res.send({ "Friends": users.friends });
    } catch (error) {
        res.json(error);
    }
})

userRouter.post("/users/:id/friends", async (req, res) => {
    try {
        const id = req.params.id;
        const myId = req.body.userId || req.body.userID;
        let users = await UserModel.findOne({ _id: id });
        users.friendRequests.push({ _id: myId });
        await UserModel.findByIdAndUpdate({ _id: id }, users);
        res.send("Friend request sent successfully");
    } catch (error) {
        res.json(error);
    }
})

userRouter.patch("/users/:id/friends/:friendId", async (req, res) => {
    try {
        const id = req.params.id;
        const friendId = req.params.friendId;
        let status = req.body.status;
        const myId = req.body.userId || req.body.userID;
        let users = await UserModel.findOne({ _id: id });
        users.friendRequests.forEach((elem, i) => {
            if (elem == friendId) {
                if (status) {
                    users.friends.push(elem)
                    users.friendRequests.splice(i, 1);
                } else {
                    users.friendRequests.splice(i, 1);
                };
            }
        })
        await UserModel.findByIdAndUpdate({ _id: id }, users);
        res.json("Friend request updated successfully");
    } catch (error) {
        res.json(error);
    }
})


module.exports = { userRouter }