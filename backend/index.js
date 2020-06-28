const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = 3001;

//mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/green2greenDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//body parser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors());


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});


