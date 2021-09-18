const express = require('express')
const authenticateJWT = require('../middleware/auth')
const login = require('../controllers/login')
const usersController = require('../controllers/users')

const routing = express.Router();

routing.post('/login', login);
routing.post('/firsttimecreateuser', usersController.firstTimeCreateUser);
routing.post('/createuser', authenticateJWT, usersController.createUser);
routing.get('/getusers', authenticateJWT, usersController.getUsers);
routing.delete('/:username', authenticateJWT, usersController.deleteUser);
routing.put('/:username', usersController.updateUser);
routing.all('*', usersController.invalid);

module.exports = routing