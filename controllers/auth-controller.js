import User from "../models/users.js";
import {HttpError} from "../helpers/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import {ctrlWrapper} from "../decorators/index.js";

const {JWT_SECRET} = process.env;

const singup = async (req, res) => {
const {email, password} = req.body;

const user = await User.findOne({email});
if(user) {
    throw HttpError(409, "Email in use")
}
const hashPassword = await bcrypt.hash(password, 10)

const newUser = await User.create({...req.body, password: hashPassword});
res.status(201).json({
    email: newUser.email, 
    subscription: newUser.subscription,
})
};

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

res.json({
    token,
})
};


export default {
    singin: ctrlWrapper(singin),
    singup: ctrlWrapper(singup),
}