const { v4: uuid } = require("uuid");
const HttpError = require("../models/errors");

const DUMMY = [
  {
    id: "u1",
    name: "Rob Osipovitch",
    description: "Famous Sky Scraper",
    email: "test@test.com",
    password: "test"
  },
];


const getUsers = (req, res) => {
    res.status(200).json({users: DUMMY})
}

const register = (req, res) => {
    const {name, email, password} = req.body

    const hasUser = DUMMY.find(user => user.email === email)

    if (hasUser) {
        throw new HttpError('That Email Already Exist, Maybe Try Logging In', 422)
    }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    }

    DUMMY.push(createdUser)

    res.status(201).json({ message: 'User Registered Successfully', user: createdUser })
}


const login = (req, res) => {
    const { email, password } = req.body

    const identifiedUser = DUMMY.find(user => user.email === email)
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could Not Find A User With That E-Mail', 401)
    }

    res.status(200).json({message: 'User Logged In Successfully'})
}

module.exports = {
    login: login,
    register: register,
    getUsers: getUsers
}