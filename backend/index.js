require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3001

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/signup', require('./routes/signup'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
