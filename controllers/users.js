const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/errors");

const UserModel = require('../models/user')

const DUMMY = [
  {
    id: "u1",
    name: "Rob Osipovitch",
    description: "Famous Sky Scraper",
    email: "test@test.com",
    password: "test",
  },
];

const getUsers = async (req, res) => {
  res.status(200).json({ users: DUMMY });
};

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs Passed", 422));
  }

  const { name, email, password, places } = req.body;

  let existingUser
  try {
   existingUser = await UserModel.findOne({ email: email });
  } catch(err) {
      const error = new HttpError('Register User Failed, Try Again Later', 500)
      return next(error)
  }

  if (existingUser) {
    const error = new HttpError("That Email Already Exist, Maybe Try Logging In", 422);
    return next(error)
  }

  const createdUser = new UserModel({
      name: name,
      email: email, 
      password: password,
      image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F10000%2Fvelka%2F2612-1273513357htay.jpg&f=1&nofb=1',
      places: places
  })

  
  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError("Could Not Register User", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ message: "User Registered Successfully", user: createdUser.toObject({ getters: true }) });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY.find((user) => user.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Could Not Find A User With That E-Mail", 401));
  }

  res.status(200).json({ message: "User Logged In Successfully" });
};

module.exports = {
  login: login,
  register: register,
  getUsers: getUsers,
};
