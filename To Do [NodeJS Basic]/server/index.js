const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3001;
const app = express();

// MongoDB Connection
require("./database");

// Body pasrer
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json())

// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('./partials', express.static(path.join(__dirname, '../views/partials')));

// View engine

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Routes

const router = require("./routes/task");
app.use('/', router);
app.use('*', (req,res)=>{
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