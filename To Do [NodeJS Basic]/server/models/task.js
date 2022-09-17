const mongoose =  require("mongoose");

const taskSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    done : {
        type : Boolean,
        default : false
    }
})

const task = mongoose.model('task', taskSchema);

module.exports = task;