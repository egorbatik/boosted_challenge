const express = require('express')
const routes = require('./src/routes');

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Consent App')
})

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('', routes);


app.listen(port, () => {
  console.log(`Consent app listening on port ${port}`)
})

module.exports = app

