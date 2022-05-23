const HttpError = require('../models/errors')
const DUMMY = [
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
  }


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
  
    res.json({ message: "Found User by ID Successful", place: foundPlace });
  }


module.exports = { getPlaceByCreatorId: getPlaceByCreatorId, getPlaceById: getPlaceById }