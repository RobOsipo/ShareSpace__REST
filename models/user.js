const mongoose = require('mongoose')
const {Schema} = mongoose
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true,
        minlength: 5
    },
    image: { 
        type: String, 
        required: true
    },
    places: { 
        type: String, 
        required: true
    }
})

// this package validates that the unique key to our email actually checks for a unique email value
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)