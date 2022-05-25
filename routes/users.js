const express = require("express");
const { check } = require('express-validator')

const HttpError = require("../models/errors");
const usersController = require('../controllers/users')
const router = express.Router();


router.get('/', usersController.getUsers)

router.post('/register',[check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min: 5})], usersController.register)

router.post('/login', usersController.login)




module.exports = router