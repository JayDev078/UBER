const e = require("express");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator"); 
const userController = require("../controllera/user.controller");



router.post('/register',[
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').isLength({min:3,max:30}).withMessage('First name must be between 3 and 30 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long') 
],
userController.registerUser
)



module.exports = router;