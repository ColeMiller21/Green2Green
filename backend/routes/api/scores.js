const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//score model
const Score = require('../../models/scoreModel')

//route GET api/scores
// '/' === '/api/scores'
//desc get all scores

router.get('/', (req, res) => {
    Score.find({})
        .sort({ date: -1 })
        .then(scores => res.json(scores))
})

//route POST api/scores
// '/' === '/api/scores'
//desc post a score

router.post('/', (req, res) => {
    const newScore = new Score({
        frontNine: req.body.frontNine,
        backNine: req.body.backNine
        //add rest of model
    });
    newScore.save().then(score => res.json(score));

})

module.exports = router;