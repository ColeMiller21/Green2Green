require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const MONGO_LOCAL = process.env.MONGO_LOCAL;

// all routes
const scores = require('./routes/api/scores');
const user = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();
const PORT = process.env.PORT || 5000

//cors setup
app.use(cors());


//bodyparser
app.use(express.json());


//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));


}


//mongodb connection
mongoose.connect(process.env.MONGODB_URI || MONGO_LOCAL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected..."));



//use routes
app.use('/api/scores', scores)
app.use('/api/users', user)
app.use('/api/auth', auth)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"))
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})






