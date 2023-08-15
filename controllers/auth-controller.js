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
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";
import createVerifyEmail from "../helpers/createVerifyEmail.js";

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

const verificationToken = nanoid();
const newUser = await User.create({...req.body, avatarURL, password: hashPassword, verificationToken});

const verifyEmail = createVerifyEmail({email, verificationToken});
console.log('verifyEmail', verifyEmail)

await sendEmail(verifyEmail);

res.status(201).json({
    email: newUser.email, 
    subscription: newUser.subscription,
    avatarURL
})
};

//верификация
const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    console.log('user', user)
    if (!user) {
        throw HttpError(404, "Not found");
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

    res.json({
        message: "Verify success"
    })
}

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;

    if(!email) {
        throw HttpError(400, "missing required field email")
    }
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(404, "Email not found");
    }

    if(user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const verifyEmail = createVerifyEmail({email, verificationToken: user.verificationToken});

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent"
    })
}

// логинизация
const singin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
if(!user) {
    throw HttpError(401, "Email or password is wrong")
}

if (!user.verify) {
    throw HttpError(401, "Email not verify");
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
    res.json({
        email,
    })
}
const signout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Signout success"
    })
}
export default {
    singin: ctrlWrapper(singin),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    singup: ctrlWrapper(singup),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateAvatar: ctrlWrapper(updateAvatar),
}
