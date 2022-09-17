const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    user_id : {
        type : String,
        required : true,
    },
})

module.exports = mongoose.model('note',noteSchema);