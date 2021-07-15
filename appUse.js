const express = require('express')
const app = express()

// Express is 2 things
// 1. A router
// 2. Middleware that comprises a framework
//    Req -----> Middleware -----> Res
//    It's any function that has access to req, res, and next objects - that's pretty much what Express is at its core.
// 2.example
// 1. Request comes in
// 2. (MW) We need to validate the user sometimes
// 3. (MW) we need to store something in the db
// 4. (MW) If there is data from the user we need to parse it and store it
// 5. Response fires

// MIDDLEWARE IS ANYTHING THAT HAS ACCESS TO req, res, and next
//! (req, res, next) - makes this function middleware
function validateUser(req, res, next) {
  // get info out of req object
  // do some stuff w/ the DB
  //! locals is something that is attached to every response and live for the life of the Response
  // http://expressjs.com/en/4x/api.html#res.locals
  // - very useful for passing data over to a template
  // - and also for passing data from place to place
  // - every piece of middleware will have access to this variable bc every piece of middleware will have access to the response object
  res.locals.validated = true
  console.log(`validator validated 🙌`)
  next() // next = "I want to hand control off to the next piece of middleware in the cycle"
  // if you don't call next you have terminated the cycle and the process will end, no more middleware will run
}

// we call that middleware function
//! v Runs validateUser on ALL paths, all methods
// app.use(validateUser) // we can outsource the work to the function and just make use of that function everywhere
//! v Runs validateUser on /admin, all methods
app.use('/admin', validateUser) // only run validateUser on /admin
// use is a lot like get as they're both handling middleware, only difference is that .use() doesn't distinguish between get, post, put..etc and we don't have to specify a path
//! v Runs validateUser on /, only on GET method
app.get('/', validateUser)
//! v^ which also looks like
app.get('/', (res, req, next) => {
  res.locals.validated = true
  console.log('Validator ran')
  next()
})

app.get('/', (req, res, next) => {
  res.send('<h1>main page 🥳</h1>')
  console.log(res.locals.validated) // undefined bc validateUser never ran
})

app.get('/admin', (req, res, next) => {
  res.send('<h1>admin page 🤖</h1>')
  console.log(res.locals.validated) // true
})

app.listen(3000)
console.log(`Listening on port 3000`)
