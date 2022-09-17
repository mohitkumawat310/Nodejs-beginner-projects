const express = require("express");
const router = express.Router();
const task = require("../controller/task")

router.get('/', task.loadTask)
router.post('/', task.newTask)
router.delete('/:id', task.deleteTask)
router.patch('/:id/:done', task.patchTask)

module.exports = router;