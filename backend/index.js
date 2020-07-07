const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors')
const path = require('path');

// all routes
const scores = require('./routes/api/scores');
const user = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();
const PORT = process.env.PORT || 5000

//bodyparser
app.use(express.json());

//mongodb connection
mongoose.connect(config.get('mongoURI'),
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

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})






