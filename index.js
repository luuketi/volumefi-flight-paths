const express = require('express')
const app = express()
const calculate = require('./routes/calculate');

require('dotenv').config();

const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/', calculate);

module.exports = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
