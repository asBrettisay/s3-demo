const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      massive = require('massive'),
      AWS = require('aws-sdk'),
      config = require('./config');

const app = module.exports = express();


app.use(express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));


app.post('/api/newimage', function(req, res, next) {

})

app.listen(3000, function() {
  console.log('Listening on 3000');
})
