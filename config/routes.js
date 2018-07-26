var path = require('path');
var HomeController = require(path.join(__dirname ,'../app/controller/HomeController'));
var AccountController = require(path.join(__dirname ,'../app/controller/AccountController'));
var express = require('express');
var path = require('path');
router = express.Router();

// ROUTING
router.get('/',function(req,res,next){
    console.log(req.session);
    next();
});
router.get('/',HomeController.home);
router.get('/users',AccountController.getUsersView);
router.get('/chats',AccountController.auth);
router.post('/chats',AccountController.auth);
router.post('/users',AccountController.register);

// API's

router.get('/api/users',AccountController.getUsers);

module.exports = router;