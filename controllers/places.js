const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/errors");
const getCoordsForAddress = require("../util/location");

const PlaceModel = require("../models/place");
const UserModel = require("../models/user");


const getPlaceById = async (req, res, next) => {
  const { id } = req.params;

  let foundPlace;
  try {
    foundPlace = await PlaceModel.findById(id);
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!foundPlace) {
    const error = new HttpError("Could Not Find A Place With That ID", 404);
    return next(error);
  }

  res.json({
    message: "Found Place by ID Successful",
    place: foundPlace.toObject({ getters: true }),
  });
};

const getPlacesByCreatorId = async (req, res, next) => {
  const { id } = req.params;

  let foundPlaces;
  try {
    foundPlaces = await PlaceModel.find({ creator: id });
  } catch (err) {
    const error = new HttpError("Fetching Places Failed, Try Again Later", 500);
    return next(error);
  }

  if (!foundPlaces || foundPlaces.length === 0) {
    return next(
      new HttpError("Could Not Find Places With That Creator ID", 404)
    );
  }

  res.json({
    // ! when using toObject({ getters: true}) it takes the _ away from _id
    message: "Found Places by Creator ID Successful",
    places: foundPlaces.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs Passed", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    console.log("The Geolocation API had an error");
    return next(error);
  }

  const createdPlace = new PlaceModel({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.cojkvno7WhjzCJTtEwuAtgHaE8%26pid%3DApi&f=1",
    creator
  });

  let user
  try {
    user = await UserModel.findById(creator)
  } catch (err) {
    const error = new HttpError('Create Place Failed', 500)
    return next(error)
  }

  if(!user) {
    const error = new HttpError('Could Not Find User For Provided ID', 404)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdPlace.save({ session: sess })
    user.places.push(createdPlace)
    await user.save({ session: sess })
    await sess.commitTransaction()

  } catch (err) {
    console.log(err)
    const error = new HttpError("Could Not Create Place", 500);
    return next(error);
  }

  res.status(201).json({
    message: "Successfully Created A New Place ",
    place: createdPlace,
  });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs Used", 422));
  }

  const { title, description } = req.body;
  const { id } = req.params;

  let foundPlacetoUpdate;
  try {
    foundPlacetoUpdate = await PlaceModel.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
  } catch (err) {
    const error = new HttpError("Could Not Update Place", 500);
    return next(error);
  }

  res
    .status(200)
    .json({
      message: "Update Place Successful",
      place: foundPlacetoUpdate.toObject({ getters: true }),
    });
};

const deletePlace = async (req, res, next) => {
  const { id } = req.params;

  let foundPlaceToDelete;
  try {
    foundPlaceToDelete = await PlaceModel.findByIdAndRemove(id);
  } catch (err) {
    const error = new HttpError("Could Not Find The Place To Delete", 500);
    return next(error);
  }

  res.status(200).json({ message: "Place Deleted Successfully" });
};

module.exports = {
  getPlacesByCreatorId: getPlacesByCreatorId,
  getPlaceById: getPlaceById,
  createPlace: createPlace,
  updatePlace: updatePlace,
  deletePlace: deletePlace,
};
