var path = require('path');
var CONST = require('./constants');
var HomeController = require(path.join(__dirname ,'../app/controller/HomeController'));
var AccountController = require(path.join(__dirname ,'../app/controller/AccountController'));
var express = require('express');
var path = require('path');
router = express.Router();

router.get('/',HomeController.home);
router.post('/chats',AccountController.auth);
router.post('/users',AccountController.register);
router.get('/users',AccountController.getUsers);

module.exports = router;