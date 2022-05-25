const express = require("express");

const HttpError = require("../models/errors");
const placesController = require('../controllers/places')
const router = express.Router();


// Find place by id
router.get("/:id", placesController.getPlaceById);

// Find place by Creator ID
router.get('/users/:id', placesController.getPlaceByCreatorId)

router.post('/', placesController.createPlace)

router.patch('/:id', placesController.updatePlace)

router.delete('/:id', placesController.deletePlace)



module.exports = router;
