const mongoose = require('mongoose');


const Schema = mongoose.Schema

const ScoreSchema = new Schema({
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;