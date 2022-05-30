const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/errors");

const UserModel = require("../models/user");

const getUsers = async (req, res) => {
  let users;
  try {
    users = await UserModel.find({}, "email name image places");
  } catch (err) {
    const error = new HttpError("Fetching Users Failed, Try Again Later", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs Passed", 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Register User Failed, Try Again Later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "That Email Already Exist, Maybe Try Logging In",
      422
    );
    return next(error);
  }

  const createdUser = new UserModel({
    name: name,
    email: email,
    password: password,
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F10000%2Fvelka%2F2612-1273513357htay.jpg&f=1&nofb=1",
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Could Not Register User", 500);
    return next(error);
  }

  res.status(201).json({
    message: "User Registered Successfully",
    user: createdUser.toObject({ getters: true }),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login User Failed, Try Again Later", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid Credentials", 401);
    return next(error);
  }

  res.status(200).json({ message: "User Logged In Successfully" });
};

module.exports = {
  login: login,
  register: register,
  getUsers: getUsers,
};
