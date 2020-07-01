const mongoose = require('mongoose');


const Schema = mongoose.Schema

const ScoreSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    frontNine: {
        type: Number,
        required: true
    },
    backNine: {
        type: Number,
        required: true
    },
    totalScore: {
        type: Number,
        // required: true
    },
    courseSlope: {
        type: Number,
        // required: true
    },
    courseRating: {
        type: Number,
        // required: true
    },
    courseName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;