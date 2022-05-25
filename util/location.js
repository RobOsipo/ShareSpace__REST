require('dotenv').config()
const HttpError = require('../models/errors')
const axios = require('axios')


const getCoordsForAddress = async (address) => {

    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.MAPS_KEY}`)

    const data = response.data

    if(!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError('Could Not Retrieve Location For Specified Address', 404)
        throw error
    }

    const coordinates = data.results[0].geometry.location

    return coordinates
        


    // return {
    //     lat: 40.7484474,
    //     lng: -73.9871516,
    //   }
}

module.exports = getCoordsForAddress