const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      massive = require('massive'),
      AWS = require('aws-sdk'),
      config = require('./config');

const app = module.exports = express();

AWS.config.update({
  accessKeyId: config.aws.ACCESS_KEY,
  secretAccessKey: config.aws.SECRET_KEY,
  region: config.aws.REGION
})

const s3 = new AWS.S3();

app.use(express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post('/api/newimage', function(req, res, next) {
  const buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  const bucketName = 'brettcaudill/' + req.body.userEmail;
  const params = {
    Bucket: bucketName,
    Key: req.body.imageName,
    Body: buf,
    ContentType: 'image/' + req.body.imageExtension,
    ACL: 'public-read'
  }

  s3.upload(params, function(err, data) {
    if (err) return res.status(500).send(err);
    console.log('UPLOADED:', data);
    res.status(200).json(data);
  })
})

app.listen(3000, function() {
  console.log('Listening on 3000');
})
