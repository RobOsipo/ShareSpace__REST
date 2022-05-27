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
    places: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Place'
    }]
})

// this package validates that the "unique" key on our email schema actually checks for a unique email value
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)