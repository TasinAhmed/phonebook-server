require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const app = express()
const persons = require('./routes/persons')
const info = require('./routes/info')
const cors = require('cors')
const mongoose = require('mongoose')
const errorController = require('./controllers/errorController')
const unknownRouteController = require('./controllers/unknownRouteController')
const PORT = process.env.PORT || 3001

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`Connection Successful ${res}`)
  })
  .catch((err) => console.log(`Error in DB connection ${err}`))

morgan.token('body', function (req) {
  return req.body ? JSON.stringify(req.body) : ''
})

app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())

app.use('/api/persons', persons)
app.use('/info', info)
app.use(unknownRouteController)
app.use(errorController)

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
