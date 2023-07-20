import Contact from "../models/contact.js";
import {HttpError} from "../helpers/index.js";


import {ctrlWrapper} from "../decorators/index.js";



const getAll = async (req, res, next) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result)
};

const getById = async (req, res) => {
    const {id} = req.params;
    const result = await Contact.findById(id);
        if(!result) {
        throw HttpError(404, `Contact with id=${id} not found`)
        }
    res.json(result)
};

const add = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`)
    }
    res.json(result);
}

const deleteById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
    res.json({
        message: "Contact delete"
    })
};

export default {
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    add: ctrlWrapper(add),
    getById: ctrlWrapper(getById),
    getAll: ctrlWrapper(getAll)
}
