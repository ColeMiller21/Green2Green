import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';



const app = express()
const PORT = 3001;

//mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/soccerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//body parser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


//CORS setup

app.use(cors());

// routes(app);


app.listen(PORT, () => {
    console.log(`Your server is running on ${PORT}`)
});