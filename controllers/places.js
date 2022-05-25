const { v4: uuid } = require("uuid");
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

const getPlaceByCreatorId = (req, res, next) => {
  const { id } = req.params;
  const foundPlace = DUMMY.find((place) => {
    return place.creator === id;
  });

  if (!foundPlace) {
    return next(
      new HttpError("Could Not Find A Place With That Creator ID", 404)
    );
  }

  res.json({ message: "Found Place by Creator ID Successful", place: foundPlace });
};

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body
    const createdPlace = {
        id: uuid(),
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator
    }

    DUMMY.push(createdPlace)

    res.status(201).json({message: 'Successfully Created A New Place ', place: createdPlace})
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body
  const {id} = req.params

  const updatedPlace = DUMMY.find( (place) => place.id === id )
  const copy = {...updatedPlace}
  const placeIndex = DUMMY.findIndex( (place) => place.id === id )
  copy.title = title
  copy.description = description

  DUMMY[placeIndex] = copy

  res.status(200).json({ message: 'Update Place Successful', place: copy })
}


const deletePlace = (req, res, next) => {
  const {id} = req.params
  DUMMY = DUMMY.filter((place) => place.id !== id)
  res.status(200).json({message: 'Place Deleted Successfully'})

}

module.exports = {
  getPlaceByCreatorId: getPlaceByCreatorId,
  getPlaceById: getPlaceById,
  createPlace: createPlace,
  updatePlace: updatePlace,
  deletePlace: deletePlace
};
