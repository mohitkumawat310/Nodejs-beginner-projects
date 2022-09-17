const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Controllers
const publicController = require('../controllers/public.controller');

// Routes
router.get('/', publicController.root);
router.post('/', publicController.sign_in_post);
router.get('/sign_up', publicController.sign_up);
router.post('/sign_up', publicController.sign_up_post);
router.get('/logout', publicController.logout)

// Export
module.exports = router