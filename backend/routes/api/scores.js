const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//score model
const User = require('../../models/userModel');
const Score = require('../../models/scoreModel')

//route GET api/scores
// '/' === '/api/scores'
//desc get all scores

router.get('/', (req, res) => {
    Score.find({})
        .sort({ date: -1 })
        .then(scores => res.json(scores))
})
//route GET api/scores
// '/' === '/api/scores'
//desc all by users id

router.get('/:userId', (req, res) => {
    // User.find({ userId: mongoose.Types.ObjectId(req.params.id) })
    //     .populate('Score')
    // then(scores => res.json(scores))
    Score.find({ userId: mongoose.Types.ObjectId(req.params.id) })
        .populate('Score')
        .sort({ date: -1 })
        .then(scores => res.json(scores))
})


//route POST api/scores
// '/' === '/api/scores'
//create a score

router.post('/', (req, res) => {
    const newScore = new Score({
        userId: req.body.userId,
        frontNine: req.body.frontNine,
        backNine: req.body.backNine,
        totalScore: req.body.totalScore,
        courseSlope: req.body.courseSlope,
        courseRating: req.courseRating,
        courseName: req.body.courseName
    });
    newScore.save().then(score => res.json(score));

})

module.exports = router;