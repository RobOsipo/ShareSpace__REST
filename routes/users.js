const express = require('express');

const router = express.Router();

const DUMMY = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description:'Famous Sky Scraper',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    },
]


router.get('/user/:id', (req, res, next) => {
    const {id} = req.params
    console.log('hit route')
})


module.exports = router