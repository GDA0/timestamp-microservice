// index.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

function isInvalidDate (date) {
  return isNaN(date.getTime())
}

app.get('/api/:date', (req, res) => {
  let date
  if (!isNaN(req.params.date)) {
    // Treat as a timestamp if it's a number
    date = new Date(parseInt(req.params.date))
  } else {
    // Treat as a date string otherwise
    date = new Date(req.params.date)
  }

  if (isInvalidDate(date)) {
    return res.json({
      error: 'Invalid Date'
    })
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

app.get('/api', (req, res) => {
  const now = new Date()
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  })
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
