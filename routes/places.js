const express = require("express");
const { check } = require('express-validator')

const HttpError = require("../models/errors");
const placesController = require('../controllers/places')
const router = express.Router();


// Find place by id
router.get("/:id", placesController.getPlaceById);

// Find place by Creator ID
router.get('/users/:id', placesController.getPlacesByCreatorId)
                                // Validation middlware array
router.post('/', [check('title').not().isEmpty(), check('description').isLength({min: 1}), check('address').not().isEmpty()], placesController.createPlace)

router.patch('/:id', placesController.updatePlace)

router.delete('/:id', placesController.deletePlace)



module.exports = router;
