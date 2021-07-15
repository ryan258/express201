const express = require('express')
const app = express()
const helmet = require('helmet') // require helmet as early as possible so the headers don't get cut off somewhere
app.use(helmet()) // now you'll have secure headers and be secure from a lot of attacks

app.use(express.static('public'))
// JSON comes over the wire as a string so it has to be parsed
// - we can bring JSON in using .json() which uses body-parser
//   http://expressjs.com/en/4x/api.html#express.json
app.use(express.json())
// .urlencoded() parses incoming reqs w/ urlencoded payloads w/ body-parser
// - parses the data into the body for us, otherwise we get an empty obj
app.use(express.urlencoded({ extended: false }))

app.post('/ajax', (req, res) => {
  // console.log(req.headers)
  console.log(req.body)
  res.send('Test')
})

app.listen(3000)
console.log(`listening on port 3000`)
