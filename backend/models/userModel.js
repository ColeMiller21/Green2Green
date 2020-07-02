const mongoose = require('mongoose');
const Score = require('./scoreModel');

const Schema = mongoose.Schema

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
    scores: { type: Schema.Types.ObjectId, ref: 'Score' }

})

const User = mongoose.model('User', UserSchema);

module.exports = User;