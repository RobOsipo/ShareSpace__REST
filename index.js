require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const placesRoutes = require('./routes/places')


const app = express()

app.use(bodyParser.json())

app.use('/api/places', placesRoutes)

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