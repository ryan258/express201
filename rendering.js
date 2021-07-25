const path = require('path')
//! // THE ROUND TRIP FOR RES.RENDER() //
//! 1.) Express as we know it happens. This file.
const express = require('express')
const app = express()

// Ready for battle
const helmet = require('helmet')
// app.use(helmet())

// serve up static files
app.use(express.static('public'))

//parse json and urlencoded data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.urlencoded())

//! 2.) Define a view engine. (EJS, mustache, handlebars, jade/pug)
//!     - Bridges node stuff to JS stuff
// http://expressjs.com/en/api.html#app.set
// app.set('view engine', 'ejs')
// app.set('view engine', 'hbs')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// or we could do more than one
// app.set('view', [path.join(__dirname, 'views'), ...])
//! 3.) Inside one of our routes we have a res.render() and pass it 2 things.
//!   - the file we want to use
//!   - data we want to send to that file (template) - (this is actually res.locals)
//! 4.) Express uses the node module for our specified view engine and parses the file.
//!   - the means, it takes the HTML/CSS/JS and combines it w/ whatever "node" there is in the file
//! 5.) The final result of this process is a compiled product of the things the browser can read.

app.get('/', (req, res, next) => {
  // res.send('sanity check')
  // res.json({ message: 'booya! success :D!' })
  res.render('index')
})

app.listen(3000)
// console.log('sanity check... beep?!')
