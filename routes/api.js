var express = require('express');
var router = express.Router();
var request = require("request");
var clientID = 'TJD25UZFTFKY0Q2AYNJUDCDKIEVYY25CTMLHO4AQYDQTK2NH';
var clientSecret = 'GF3SBUHKMSFWU5XYXTSW2MPD2BKIBL103PVAYZUZB1WECMJM&';
var redirectURI = 'http://pennapps2015.cloudapp.net:3000/api/get/location/photos/render';
router.get('/', function(req, res) {
  res.send('<h1>Scouter!</h1>');
});

router.get('/get/properties', function(req, res) {
  res.json({'name':'Wells Fargo Center', 'cost':'10,000', 'owner':'Comcast Spectacor'});
});


router.get('/get/authentication', function(req, res) {
    var get_oauth = 'https://foursquare.com/oauth2/authenticate?client_id=' + clientID + '&response_type=token&redirect_uri=' + redirectURI;
    res.redirect(get_oauth);
});



router.get('/get/location', function(req, res) {

    if (req.query.name === undefined) {
        res.send('Variable "name" not passed');
    }

    else if (req.query.near === undefined) {
        res.send('Variable "near" not passed');
    }

    else {
        var name = req.query.name;
        var near = req.query.near;
        var foursquareRequest = 'https://api.foursquare.com/v2/venues/search?query=' + name + '&near=' + near + '&client_id= ' + clientID + '&client_secret=' + clientSecret + 'v=20150905';

        request(foursquareRequest, function(error, response, body) {
          res.json(JSON.parse(body));
        });
    }
});

router.get('/get/location/photos', function(req, res){

    if (req.query.name === undefined) {
        res.send('Variable "name" not passed');
    }

    else if (req.query.near === undefined) {
        res.send('Variable "near" not passed');
    }

    else {
        var name = req.query.name;
        var near = req.query.near;
        var req_url = 'http://pennapps2015.cloudapp.net:3000/api/get/location?name=' + name + '&near=' + near;

        request(req_url, function(error, response, body) {
            body = JSON.parse(body)
            if (body.venues[0].id === undefined){
                res.send('No results found. Please try again');
            }
            else{
                var photo_url = 'https://api.foursquare.com/v2/venues/' + body.venues[0].id + '/photos';

                request(photo_url, function(error, response, body) {
                    res.json(JSON.parse(body));
                });
//                res.json(JSON.parse(body));
            }
        });
    }
});


router.get('/get/location/photos/render', function(req, res){
    var token = req.query.access_token;
    res.send('query: ' + req.query.access_token + ' params:' + req.params.access_token);
});

module.exports = router;
