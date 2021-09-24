const express = require('express');
const router = express.Router();
// const userController = require('../controllers/userController');

// middleware checks if the user is logged in or not
const middleware = require('../controllers/middleware');
const register = require('../controllers/register');
const login = require('../controllers/login');
const getUsers = require('../controllers/getUsers');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');
const addClub = require('../controllers/addClub');
const getClubs = require('../controllers/getClubs');
const addMember = require('../controllers/addMember');
 
router.post('/register', register);
router.post('/login', login);
router.get('/users', middleware, getUsers);
router.post('/deleteUser', middleware, deleteUser);
router.post('/addClub', middleware, addClub);
router.post('/getClubs', middleware, getClubs);
router.post('/addMember', middleware, addMember);

 
module.exports = router;