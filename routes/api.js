var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('<h1>Welcome!</h1>');
});

module.exports = router;
