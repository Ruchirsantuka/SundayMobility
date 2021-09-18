const express = require('express')
const app = express()
const router = require('./routes/routing')

app.use(express.json())
app.use('/', router)

const port = 5000
try {
  app.listen(port, console.log(`Server is listening on port ${port}...`))
} catch (error) {
  console.log(error)
}