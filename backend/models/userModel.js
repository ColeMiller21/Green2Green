const mongoose = require('mongoose');
const Score = require('./scoreModel');

const Schema = mongoose.Schema

// const ScoreSchema = new Schema({
//     frontNine: {
//         type: Number,
//         required: true
//     },
//     backNine: {
//         type: Number,
//         required: true
//     },
//     totalScore: {
//         type: Number,
//         required: true
//     },
//     courseSlope: {
//         type: Number,
//         required: true
//     },
//     courseRating: {
//         type: Number,
//         required: true
//     },
//     courseName: {
//         type: String
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }

// })


const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalHandicap: {
        type: Number,
        default: 0
    },
    scores: {
        type: [],
        default: undefined
    }

})

const User = mongoose.model('User', UserSchema);

module.exports = User;