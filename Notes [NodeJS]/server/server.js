const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Dotenv
require("dotenv").config();
const port = process.env.PORT || 3003;

// Databse [MongoDB]
require("./conf/databse.conf");

// Body pasrer
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json())

// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('partials', express.static(path.join(__dirname, '../views/partials')));

// View engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middelware
const signInAuth = require("./middleware/signIn.middleware")
// Routes

const publicRoute = require("./routes/public.route");
app.use('/', publicRoute);
const noteRoute = require("./routes/note.route");
app.use('/notes',signInAuth, noteRoute);
app.use('*', (_req,res)=>{
    res.status(404).send("404 Not found");
})

//Listening
app.listen(port, (err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log(`Server is running at port : ${port}`);
    }
})