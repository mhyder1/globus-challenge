/**
 * Module dependencies.
 */

var express = require('express');
var cors = require('cors');
var path = require('path');

var app = module.exports = express();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// allow access to clients from all domains
app.use(cors());

app.use(express.static("public"));

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use('/api', function(req, res, next){
  var key = req.header('api-key');

  // key isn't present
  if (!key) return next(error(400, 'api key required'));

  // key is invalid
  if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  // all good, store req.key for route access
  req.key = key;
  next();
});

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

var apiKeys = ['globus'];

// we now can assume the api key is valid,
// and simply expose the data

app.get('/api/:test', function(req, res, next){
  let test = req.params.test;
  res.sendFile(
    `test${test}.json`,
    { root: path.join(__dirname, 'public') },
    function (err) {
      if (err) {
        next(err)
      } else {
        console.log(`Sent: ${test}`);
      }
    }
  );
});

app.get('/design/:design', function(req, res, next){
  let design = req.params.design;
  res.sendFile(
    `design_${design}.png`,
    { root: path.join(__dirname, 'public/images') },
    function (err) {
      if (err) {
        next(err)
      } else {
        console.log(`Sent: ${design}`);
      }
    }
  );
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
