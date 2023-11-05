import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    quizTitle: {
        type: String,
        required: true
    }
})

const score = mongoose.model("score", scoreSchema)

export default score