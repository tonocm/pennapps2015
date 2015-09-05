var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('<h1>Scouter!</h1>');
});

router.get('/get/properties', function(req, res) {
  res.json({'name':'Wells Fargo Center', 'cost':'10,000', 'owner':'Comcast Spectacor'});
});

router.get('/get/db', function(req, res) {

//    https://foursquare.com/oauth2/authenticate?client_id=TJD25UZFTFKY0Q2AYNJUDCDKIEVYY25CTMLHO4AQYDQTK2NH&response_type=code
//    https://foursquare.com/oauth2/authenticate?client_id=TJD25UZFTFKY0Q2AYNJUDCDKIEVYY25CTMLHO4AQYDQTK2NH&response_type=code&redirect_uri=https://google.com


    res.send('id: '/* + req.query.code*/);
});

module.exports = router;
