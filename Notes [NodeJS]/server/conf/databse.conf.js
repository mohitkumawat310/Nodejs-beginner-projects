const mongoose = require("mongoose");

const URL = process.env.dbURL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => { console.log("Database connected") })
.catch((err) => { console.log("Error in connecting to database" + err.message) })