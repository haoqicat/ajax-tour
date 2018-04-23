const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('I am the API server')
})

app.listen(3000, () => {
  console.log('running on port 3000...')
})
