const express = require("express");
const { check } = require('express-validator')

const HttpError = require("../models/errors");
const placesController = require('../controllers/places')
const router = express.Router();


// Find place by id
router.get("/:id", placesController.getPlaceById);

// Find place by Creator ID
router.get('/users/:id', placesController.getPlacesByCreatorId)

router.post('/', [check('title').not().isEmpty(), check('description').not().isEmpty(), check('address').not().isEmpty()], placesController.createPlace)

router.patch('/:id',[check('title').not().isEmpty(), check('description').not().isEmpty()], placesController.updatePlace)

router.delete('/:id', placesController.deletePlace)



module.exports = router;
