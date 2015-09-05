var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('<h1>Scouter!</h1>');
});

router.get('/get/properties', function(req, res) {
  res.json({'name':'Wells Fargo Center', 'cost':'10,000', 'owner':'Comcast Spectacor'});
});

router.get('/get/user', function(req, res) {
  res.send('<h1>Scouter!</h1>');
});

module.exports = router;
