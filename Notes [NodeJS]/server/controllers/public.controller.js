const publicController = require('./public.controller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Models
const userModel = require("../models/user.model");

// Route handling
publicController.root = (req, res) => {
    try {
        jwt.verify(req.cookies.signInToken, process.env.jwtToken);
        res.redirect("/notes");
    } catch (error) {
        res.render("index");
    }
}
publicController.sign_in_post = async (req, res) => {
    const userOnDB = await userModel.findOne({ username: req.body.username });
    if (req.body.password == userOnDB.password) {
        let signInToken = jwt.sign({ _id: userOnDB._id }, process.env.jwtToken);
        res.cookie("signInToken", signInToken, {
            httpOnly: true,
        }).redirect("/notes");
    } else {
        res.send("You are a fake one")
    }
}

publicController.sign_up = (req, res) => {
    try {
        jwt.verify(req.cookies.signInToken, process.env.jwtToken);
        res.redirect("/notes");
    } catch (error) {
        const message = "";
        res.render("sign_up", { message });
    }
}
publicController.sign_up_post = async (req, res) => {
    const { name, username, password, confirm_password } = req.body;
    if (name && username && password && confirm_password) {
        if (password != confirm_password) {
            const message = "Password and confirm password should be same"
            res.render("sign_up", { message })
        } else {
            try {
                // Check user exists or not
                const fio = await userModel.findOne({ "username": username });
                if (fio) {
                    const message = "Username already exists"
                    res.render("sign_up", { message })
                } else {
                    await userModel.create({
                        name: name,
                        username: username,
                        password: password
                    })
                    res.redirect("/")
                }
            } catch (error) {
                res.redirect("/")
            }
        }
    }
}

// logout
publicController.logout = async (req, res) => {
    const signInToken = jwt.sign({ _id: "oooooooooo" }, "csuwufhwiu")
    res.cookie("signInToken", signInToken, {
        httpOnly: true,
    }).redirect("/");
}
// Export
module.exports = publicController;
