const express = require("express");

const HttpError = require("../models/errors");
const usersController = require('../controllers/users')
const router = express.Router();


router.get('/', usersController.getUsers)

router.post('/register', usersController.register)

router.post('/login', usersController.login)




module.exports = router