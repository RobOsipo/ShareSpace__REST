const express = require("express");

const router = express.Router();

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

// Find place by id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const foundPlace = DUMMY.find((place) => {
    return place.id === id;
  });

  res.json({ message: "Found Place by ID Successful", place: foundPlace });
});

// Find place by creator ID
router.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  const foundUser = DUMMY.find((place) => {
    return place.creator === id;
  });

  res.json({ message: "Found User by ID Successful", place: foundUser });
});

module.exports = router;
