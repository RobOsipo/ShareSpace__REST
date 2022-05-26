const mongoose = require('mongoose')
const {Schema} = mongoose

const placeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Place', placeSchema)