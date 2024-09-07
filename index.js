const express = require('express')
const app = express()

require('dotenv').config();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Hello world")
})

module.exports = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
