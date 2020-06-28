import mongoose from 'mongoose';


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
        required: true
    },
    courseName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    totalHandicap: {
        type: Number,
        required: true,
        default: 0
    },
    scores: [ScoreSchema]
})

const User = mongoose.model('user', UserSchema);

export default User;