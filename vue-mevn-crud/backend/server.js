const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const database = require('./database')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000;
const createError = require('http-errors');


const studentAPI = require('../backend/routes/student.route')

// Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)

// express au lieu de bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

// API
app.use('/api', studentAPI);

// CREATE PORT
app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Find 404
app.use((req, res, next) => {
    next(createError(404));
});
  
  // error handler
  app.use(function (err, req, res) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
