import User from "../models/users.js";
import {HttpError} from "../helpers/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import path from "path";
import fs from "fs/promises";
import {ctrlWrapper} from "../decorators/index.js";
import gravatar from 'gravatar';
import Jimp from "jimp";

const avatarPath = path.resolve("public", "avatars")

const {JWT_SECRET} = process.env;


// регистрация
const singup = async (req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(user) {
    throw HttpError(409, "Email in use")
}
const hashPassword = await bcrypt.hash(password, 10)
const avatarURL = gravatar.url(email, {protocol: 'https', s: '250'});
const newUser = await User.create({...req.body, avatarURL, password: hashPassword});

res.status(201).json({
    email: newUser.email, 
    subscription: newUser.subscription,
    avatarURL
})
};
// логинизация
const singin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
if(!user) {
    throw HttpError(401, "Email or password is wrong")
}
const passwordCommpare = await bcrypt.compare(password, user.password);
if(!passwordCommpare) {
    throw HttpError(401, "Email or password is wrong")
}
const payload = {
    id: user._id,
}

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
await User.findByIdAndUpdate(user._id, {token});

res.json({
    token,
})
};


const updateAvatar = async (req, res) => {
    const {path: oldPath, filename} = req.file;
    console.log('req.file', req.file)
    const newPath = path.join(avatarPath, filename);
    const newPathJimp = await Jimp.read(oldPath);
    newPathJimp.resize(250, 250).write(oldPath);

    console.log('newPath', newPath)
    await fs.rename(oldPath, newPath);
    const newavatarURL = path.join("avatars", filename)
    
    await User.findOneAndReplace({...req.body, newavatarURL});
    res.status(201).json({
        avatarURL: newavatarURL
})
}

const getCurrent = (req, res) => {
    const {email} = req.user;
    console.log(email)
    res.json({
        email,
    })
}
const signout = async(req, res)=> {
    const {_id} = req.user;
    console.log('_id2', _id)
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Signout success"
    })
}
export default {
    singin: ctrlWrapper(singin),
    singup: ctrlWrapper(singup),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateAvatar: ctrlWrapper(updateAvatar),
}
