const express = require('express')
const app = express()
const bodyParser = require('body-parser')

/*** cors START***/
const cors = require('cors')

app.use(cors())
/*** cors END ***/

// mongoose START
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/react-ajax')
var db = mongoose.connection
db.on('error', () => console.error('Mongo Failed to Connect!!!!'))
db.on('connected', () => console.log('Mongo Connected'))
// mongoose END

app.use(bodyParser.json())

const Comment = require('./models/comment.js')

app.post('/comment', async (req, res) => {
  try {
    const comment = new Comment(req.body)
    const cmt = await comment.save()
    res.json({
      comment: cmt
    })
  } catch (err) {
    res.status(406).json({ msg: '提交失败' })
  }
})

app.get('/comments', async (req, res) => {
  const comments = await Comment.find()
  res.json({
    comments
  })
})

app.get('/', (req, res) => {
  res.send('I am the API server')
})

app.listen(3000, () => {
  console.log('running on port 3000...')
})
