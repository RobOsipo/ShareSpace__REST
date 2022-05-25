const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/errors");

let DUMMY = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Famous Sky Scraper",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const { id } = req.params;
  const foundPlace = DUMMY.find((place) => {
    return place.id === id;
  });

  if (!foundPlace) {
    throw new HttpError("Could Not Find A Place With That ID", 404);
  }

  res.json({ message: "Found Place by ID Successful", place: foundPlace });
};

const getPlacesByCreatorId = (req, res, next) => {
  const { id } = req.params;
  const foundPlaces = DUMMY.filter((place) => {
    return place.creator === id;
  });

  if (!foundPlaces || foundPlaces.length === 0) {
    return next(
      new HttpError("Could Not Find Places With That Creator ID", 404)
    );
  }

  res.json({
    message: "Found Places by Creator ID Successful",
    places: foundPlaces,
  });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs Passed", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title: title,
    description: description,
    location: coordinates,
    address: address,
    creator: creator,
  };

  DUMMY.push(createdPlace);

  res
    .status(201)
    .json({
      message: "Successfully Created A New Place ",
      place: createdPlace,
    });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs Passed", 422);
  }

  const { title, description } = req.body;
  const { id } = req.params;

  const updatedPlace = DUMMY.find((place) => place.id === id);
  const copy = { ...updatedPlace };
  const placeIndex = DUMMY.findIndex((place) => place.id === id);
  copy.title = title;
  copy.description = description;

  DUMMY[placeIndex] = copy;

  res.status(200).json({ message: "Update Place Successful", place: copy });
};

const deletePlace = (req, res, next) => {
  const { id } = req.params;
  
  if(!DUMMY.find(place => place.id === id)) {
    throw new HttpError('Could not Find A Place With That ID', 404)
  }

  DUMMY = DUMMY.filter((place) => place.id !== id);
  res.status(200).json({ message: "Place Deleted Successfully" });
};

module.exports = {
  getPlacesByCreatorId: getPlacesByCreatorId,
  getPlaceById: getPlaceById,
  createPlace: createPlace,
  updatePlace: updatePlace,
  deletePlace: deletePlace,
};
