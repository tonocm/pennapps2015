var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('<h1>Scouter!</h1>');
});

router.get('/get/properties', function(req, res) {
  res.json({'name':'Wells Fargo Center', 'cost':'10,000', 'owner':'Comcast Spectacor'});
});

router.get('/get/db', function(req, res) {
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    res.send("working!");
  });
});

module.exports = router;
