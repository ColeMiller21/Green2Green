require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors')
const path = require('path');
const morgan = require('morgan')

// all routes
const scores = require('./routes/api/scores');
const user = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();
const PORT = process.env.PORT || 5000


app.use(morgan('tiny'));
//bodyparser
app.use(express.json());


//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "public", "index.html"))
    });
}


//mongodb connection
mongoose.connect(process.env.MONGODB_URI || config.get('mongoURI'),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected..."));

//cors setup
app.use(cors());


//use routes
app.use('/api/scores', scores)
app.use('/api/users', user)
app.use('/api/auth', auth)




app.listen(process.env.PORT || PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})






