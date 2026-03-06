const express = require('express');          // only once
const router = express.Router();
const userController = require('../controller/userController.js'); // your controller

// CRUD routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;