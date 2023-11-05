import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import scoreSchema from "./scoreSchema.js"

//connect to express app
const app = express()
const PORT = 5005

//connect to MongoDB
const dbURI = "mongodb+srv://serviceUser:ServiceUser1@cluster0.ptduzzq.mongodb.net/?retryWrites=true&w=majority";
//"mongodb://localhost:27017/score"
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: http://localhost:${PORT} and connected to MongoDb`)
        })
    })
    .catch(error => {
        console.log(`Unable to connect to server or mongodb ${error}`)
    })

//middleware
app.use(bodyParser.json())
app.use(cors())

//routes
app.post("/score", async (req, res) => {
    try {
        const { userId, score, date, quizTitle } = req.body
        const newscore = new scoreSchema({ userId, score, date, quizTitle })

        await newscore.save()
        res.status(201).json({
            message: "Score added"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})



app.get("/getScores/:id", async (req, res) => {
    try {
        const scores = await scoreSchema.find({ userId: req.params.id })
        console.log(scores)
        const userResponses = scores.map(score => ({
            score: score.score,
            quizTitle: score.quizTitle,
            date: score.date
        }));

        res.status(201).json(userResponses)
    } catch (error) {
        res.status(500).json({ error: "Unable to get user's profiles" })
    }
})