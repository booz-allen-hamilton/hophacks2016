var express = require('express');
var request = require('request');
var _ = require('underscore');
var app = express();

var url = 'http://311.baltimorecity.gov/open311/v2/requests.json'

app.set('views', './templates')
app.set('view engine', 'hbs');

app.use(express.static('static'))

app.get('/:address', function (req, res) {
  // access address using req.params.address
  if (!req.params && !req.params.address) {
    res.status(400).send('Error: no address specified');
    return;
  }

  var addr = req.params.address;

  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var parsed = JSON.parse(body);

      var filtered = _.filter(parsed, function(item) {
        return item.address === addr;
      });      

      res.render('results', { results: filtered }); 
    } else {
      res.status(500).send('Something went wrong.');
      return;
    }
  }); 
});

app.listen(3000, function () {
  console.log('Baltimore 311 Search listening on port 3000!');
});
