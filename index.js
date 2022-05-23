require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const HttpError = require('./models/errors')
const placesRoutes = require('./routes/places')


const app = express()

app.use(bodyParser.json())

app.use('/api/places', placesRoutes)

// This middlware handles all incorrect routes
app.use((req, res, next) => {
    const error = new HttpError('Could Not Find This Route', 404)
    throw error
})

// If you add error as a first parameter express knows to only run this middlware if you actually have an error
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An Unknown Error Occured'})
})



app.listen(5000, () => {
    console.log('listening on port 5000')
})