const express = require('express');
const router = express.Router();

// Controllers
const noteController = require('../controllers/note.controller');

// Routes
router.get('/', noteController.notes);
router.get('/delete/:_id', noteController.delete_notes);
router.get('/edit/:_id', noteController.edit_note);
router.post('/edit/:_id', noteController.edit_note_post);
router.get('/create_note', noteController.create_note);
router.post('/create_note', noteController.create_note_post);

// Export
module.exports = router