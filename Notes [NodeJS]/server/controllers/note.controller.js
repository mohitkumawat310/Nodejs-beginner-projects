const noteController = require('./note.controller');
const jwt = require('jsonwebtoken');

// Models
const noteModel = require("../models/note.model");

// Route handling
noteController.notes = async (req, res) => {
    try {
        const notes = await noteModel.find({ user_id: jwt.decode(req.cookies.signInToken)._id });
        const message = "";
        res.render("notes/notes", { message, notes })
    } catch (error) {
        const message = "Error in loading : " + error;
        res.render("notes/notes", { message })
    }
}
noteController.delete_notes = async (req, res) => {
    try {
        await noteModel.deleteOne({ _id: req.params._id });
        res.redirect("/notes")
    } catch (error) {
        res.redirect("/notes")
    }
}

noteController.create_note = (req, res) => {
    const message = "";
    res.render("notes/create_note", { message })
}


noteController.create_note_post = async (req, res) => {
    const { text } = req.body;
    if (text) {
        try {
            await noteModel.create({
                text: text,
                user_id: jwt.decode(req.cookies.signInToken)._id
            })
            const message = "Note created successfully"
            res.render("notes/create_note", { message })
        } catch (error) {
            const message = "Error in creating account : " + error;
            res.render("notes/create_note", { message })
        }
    }
}

noteController.edit_note = async (req, res) => {
    try {
        const _id = req.params._id;
        const notes = await noteModel.findOne({ _id: _id });
        const message = "";
        res.render("notes/edit", { message, notes })
    } catch (error) {
        const message = "Error in loading : " + error;
        res.render("notes/edit", { message })
    }
}
noteController.edit_note_post = async (req, res) => {
    const message = "Note edited";
    const _id = req.params._id;
    try {
        const notes = await noteModel.findOne({ _id: _id, user_id: jwt.decode(req.cookies.signInToken)._id });
        if (notes) {
            try {
                await noteModel.updateOne({ _id: _id }, {
                    $set: {
                        text: req.body.text,
                        user_id: jwt.decode(req.cookies.signInToken)._id
                    }
                });
                const message = "Note edited successfully"
                res.redirect("/notes")
            } catch (error) {
                const message = "Error in update :" + error
                res.redirect("/notes")
            }
        } else {
            const message = "Note note found on your account"
            res.redirect("/notes")
        }
    } catch (error) {
        const message = "Error in note founding :" + error
        res.redirect("/notes")
    }
}

// Export
module.exports = noteController;
