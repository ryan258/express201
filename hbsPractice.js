const path = require('path')

const express = require('express')
const app = express()

const helmet = require('helmet')
// app.use(helmet())

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

//! 4.) Express uses the node module for our specified view engine and parses the file.
//!   - the means, it takes the HTML/CSS/JS and combines it w/ whatever "node" there is in the file
//!   - Data we want to send to our template file! THE 2ND ARG!
//      - the obj will be appended to res.local
//! 5.) The final result of this process is a compiled product of the things the browser can read.

/*const validateUser = (req, res, next) => {
  // .. real world we do some validation logic
  res.locals.validated = true
  next()
}

app.use(validateUser)
*/

// or just

app.use((req, res, next) => {
  // .. real world we do some validation logic
  res.locals.validated = true
  next()
})
// now every path will have access to locals.validated

app.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About these ghosts...'
  })
})

app.get('/', (req, res, next) => {
  res.render('index', {
    country: {
      name: 'Argentina',
      capital: 'Buenos Aires'
    },
    critters: [
      {
        name: 'Orson',
        type: 'Cow',
        imposter: false
      },
      {
        name: 'Manny',
        type: 'Manatee',
        imposter: false
      },
      {
        name: 'Ike',
        type: 'Bear',
        imposter: true
      }
    ],
    message: 'beep boop',
    message2: 'boo!',
    // HTML came from teh DB and we want to drop it in the template
    html: `<p><img src="https://www.kindpng.com/picc/m/103-1038268_not-scary-cartoon-ghost-hd-png-download.png" /></p>`
  })
})

app.listen(3000)
// console.log('sanity check... beep?!')
