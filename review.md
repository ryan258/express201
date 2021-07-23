# 101

## Networking - http and tcp|ip/udp

- stateless
- connectionless
- flexible
- HTTP message
  - start line
    - req: GET /blog http/1.1
      - we can see the intent of the req
    - res: http/1.1 200 OK
  - headers - simple, but really frustrating if you don't know how they work
    - {key:value} pairs
    - content-type:text/html
    - content-type:application/json
    - Cache-Control: public, max-age=0
    - Date: Fri, 24 Aug 2021 04:30:00 GMT
  - _blank line the separates the headers from the body_
  - body
    - the stuff! - HTML, 4K video in binary, image... etc...

As developers, our job starts when we get the request. It

And the last thing we do is send out the response.

## Node Server

- write headers
- write body
  - used the fs module
- close connection
- server.listen (we can listen on like 56000 ports)
  - 3000
- req, res
  - which we basically use w/ every single callback
  - which is middleware, which is basically just 2 http messages
  - we can get all the data that we need out of req and res

## Express version

- Express is NodeJS
- app === express() === createApplication()
  - see: node_modules/express/lib/express.js see: default export
- server.listen ---> app.listen
- build a little router
  - app.get, app.post, app.all, etc
- served up static files w/ express.static() middleware

# 201

## Middleware

- is any function that has access to req, res, and next
  - req, res are basically just HTTP messages
    - we pull data out of the req
    - do something cool
    - and respond with something awesome
  - networking | node/express dev | networking
  - app.use, anyime you see a callback/function (req, res, next)
    - next is the way to move a piece of middleware forward, w/o it the cycle stops
- express.json() -- works w/ body parser which creates req.body
- express.urlencoded() -- works w/ body parser which creates req.body
- helmet() -- the 3rd party module that writes safe stuff to headers to thwart attacks

## Request

- req.ip - fetches the IP of the requester
- req.path - contains the requested path
- req.body - parsed data

## Response

- res.send - we're always going to send something back in express cases, ie text/html
  - (.end() - if you were going to run a process but never respond w/ anything) -
- res.sendFile - send back a file, we'll hardly use this
- res.locals - is available throughout the response cycle
- res.json - (jsonp) - sends json back as application/json

## Debugging

- First line of defense when looking at an error message is to look for a file that you made. The (line #:char #)

## THE ROUND TRIP FOR RES.RENDER()

1. Express as we know it happens. This file.
2. Define a view engine. (EJS, mustache, handlebars, jade/pug)

- http://expressjs.com/en/api.html#app.set

3. Inside one of our routes we have a res.render() and pass it 2 things

- the file we want to use
- data we want to send to that file (template) - (this is actually res.locals)

4. Express uses the node module for our specified view engine and parses the file.

- the means, it takes the HTML/CSS/JS and combines it w/ whatever "node" there is in the file

5. The final result of this process is a compiled product of the things the browser can read.
