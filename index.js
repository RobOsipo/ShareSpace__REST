require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const placesRoutes = require('./routes/places')


const app = express()

app.use(bodyParser.json())

app.use('/api/places', placesRoutes)



app.listen(5000, () => {
    console.log('listening on port 5000')
})