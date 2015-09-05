var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('<h1>Scouter!</h1>');
});

router.get('/get/properties', function(req, res) {
  res.json({'name':'Wells Fargo Center', 'cost':'10,000', 'owner':'Comcast Spectacor'});
});

router.get('/get/venue', function(req, res) {

    if (req.query.search === undefined) {
        res.send('Variable "search" not passed');
    }
    else if (req.query.near === undefined) {
        res.send('Variable "near" not passed');
    }
    else {
        var clientID = 'TJD25UZFTFKY0Q2AYNJUDCDKIEVYY25CTMLHO4AQYDQTK2NH';
        var clientSecret = 'GF3SBUHKMSFWU5XYXTSW2MPD2BKIBL103PVAYZUZB1WECMJM&';
        var query = req.query.search;
        var near = req.query.near;
        var foursquareRequest = 'https://api.foursquare.com/v2/venues/search?query=' + query + '&near=' + near + '&client_id= ' + clientID + '&client_secret=' + clientSecret + 'v=20150905';

        request(foursquareRequest, function(error, response, body) {
          res.json(JSON.parse(body););
        });

        // res.send('testing');
    }
});

module.exports = router;
