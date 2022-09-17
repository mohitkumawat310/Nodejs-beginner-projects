const task = require("./task");
// Models
const Task = require("../models/task")
// For task loadind
task.loadTask = async(req,res)=>{
    try {
        const task = await Task.find();
        res.render("index", {task});
    } catch (error) {
        console.log("Error")
        res.send("Failed");
    }
}
// For task add
task.newTask = async(req,res)=>{
    const task = new Task({
        title: req.body.title
    })
    try {
        await task.save();
        res.redirect('/');
    } catch (error) {
        console.log("Error")
        res.send("Failed");
    }
}
// For delete task
task.deleteTask = async(req,res)=>{
    try {
        const task = await Task.deleteOne({_id : req.params.id});
        // console.log(task);
        res.json(task);
    } catch (error) {
        console.log("Error")
        res.send("Failed");
    }
}
// For patch task
task.patchTask = async(req,res)=>{
    try {
        if(req.params.done == "true"){
            req.params.done = false;
        }else{
            req.params.done = true;
        }
        const task = await Task.updateOne({_id : req.params.id}, {
            $set:{
                done : req.params.done
            }
        })
        // console.log(task);
        res.json(task);
    } catch (error) {
        console.log("Error")
        res.send("Failed");
    }
}
module.exports = task;