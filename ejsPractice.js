const path = require('path')

const express = require('express')
const app = express()

const helmet = require('helmet')
// app.use(helmet())

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//! 4.) Express uses the node module for our specified view engine and parses the file.
//!   - the means, it takes the HTML/CSS/JS and combines it w/ whatever "node" there is in the file
//! 5.) The final result of this process is a compiled product of the things the browser can read.

app.get('/', (req, res, next) => {
  res.render('index')
})

app.listen(3000)
// console.log('sanity check... beep?!')
