var path = require('path');
var HomeController = require(path.join(__dirname ,'../app/controller/HomeController'));
var AccountController = require(path.join(__dirname ,'../app/controller/AccountController'));
var express = require('express');
router = express.Router();

// ROUTING

router.all('/',HomeController.home);
router.get('/users',AccountController.getUsersView);
router.get('/chats',AccountController.auth);
router.post('/chats',AccountController.auth);
router.post('/users',AccountController.register);
router.post('/logout',AccountController.logout);


// API's

router.get('/api/users',AccountController.getUsers);

module.exports = router;