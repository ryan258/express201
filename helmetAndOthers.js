const express = require('express')
const app = express()
const helmet = require('helmet') // require helmet as early as possible so the headers don't get cut off somewhere
app.use(
  helmet({
    // helmet itself is 12 little pieces and here we're overriding one
    contentSecurityPolicy: false
  })
) // now you'll have secure headers and be secure from a lot of attacks
//! .static() + .json() + .urlencoded() are basically going to be included on every app
app.use(express.static('public'))
// JSON comes over the wire as a string so it has to be parsed
// - we can bring JSON in using .json() which uses body-parser
//   http://expressjs.com/en/4x/api.html#express.json
//! .json() and .urlencoded() together allow you to field most any data coming in
app.use(express.json())
// .urlencoded() parses incoming reqs w/ urlencoded payloads w/ body-parser
// - parses the data into the body for us, otherwise we get an empty obj
app.use(express.urlencoded({ extended: false }))
// - because when a form comes through it's usually going to be urlencoded, so this handles headers that have x-www-form-urlencoded

//! v this route is going to handle our AJAX req
app.post('/ajax', (req, res) => {
  // console.log(req.headers)
  console.log(req.body) // a mirror img of the data that was sent
  // res.send('Test') // sends as a mime-type be default text/html
  //! v res.json() v super awesome!
  res.json('Test') // changes mim-type to application/JSON
})

app.listen(3000)
console.log(`listening on port 3000`)
