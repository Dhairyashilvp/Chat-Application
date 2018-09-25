var path = require('path');
var LoginController = require(path.join(__dirname ,'../app/controller/LoginController'));
var AccountController = require(path.join(__dirname ,'../app/controller/AccountController'));
var ChatController = require(path.join(__dirname ,'../app/controller/ChatController'));
var express = require('express');
router = express.Router();

// ROUTING

router.all('/',LoginController.login);
router.get('/users',AccountController.getUsersView);
router.get('/chats',AccountController.auth);
router.post('/chats',AccountController.auth);
router.post('/users',AccountController.register);
router.post('/logout',AccountController.logout);
router.post('/chatData',ChatController.getChatData);


// API's

router.get('/api/users',AccountController.getUsers);

module.exports = router;