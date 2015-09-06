var express = require('express');
var request = require('request');
var router = express.Router();

var clientID = 'TJD25UZFTFKY0Q2AYNJUDCDKIEVYY25CTMLHO4AQYDQTK2NH';
var clientSecret = 'GF3SBUHKMSFWU5XYXTSW2MPD2BKIBL103PVAYZUZB1WECMJM&';
var redirectURI = 'http://pennapps2015.cloudapp.net:3000/api/get/location/photos/render';
var accessToken = 'F4WDV0ZNYAQDVXYNUASH1N4SOIP0425SCAK3PVKYB43IMK3M';

/**
 * Authenticate with Foursquare.
 */
router.get('/vendor/relationships/authentication', function(req, res) {
  res.redirect('https://foursquare.com/oauth2/authenticate?client_id=' + clientID + '&response_type=token&redirect_uri=' + redirectURI);
});

/**
 *
 */
router.get('/locations/:name/relationships/nearby/:near', function(req, res) {

    if (!req.params.name) {
      res.status(400);
      return res.json({
        error: 'Variable `name` not passed.'
      });
    }

    if (!req.params.near) {
      res.status(400);
      return res.json({
        error: 'Variable `near` not passed.'
      });
    }

    var name = req.params.name;
    var near = req.params.near;

    request('https://api.foursquare.com/v2/venues/search?query=' + name + '&near=' + near + '&client_id= ' + clientID + '&client_secret=' + clientSecret + 'v=20150905', function(error, response, body) {
      res.json({
        data: JSON.parse(body)
      });
    });
});

/**
 *
 */
router.get('/locations/:name/relationships/nearby/:near/photos', function(req, res){
    if (req.params.name === undefined) {
      res.status(400);
      return res.json({
        error: 'Variable `name` not passed.'
      });
    }

    if (req.params.near === undefined) {
      res.status(400);
      return res.json({
        error: 'Variable `near` not passed.'
      });
    }

    var name = req.query.name;
    var near = req.query.near;

    request('http://pennapps2015.cloudapp.net:3000/vendor/?name=' + name + '&near=' + near, function(error, response, body) {

      console.log(body);

      var fsq = JSON.parse(body);

      if(!fsq.response.venues){
        return res.json({
          data: []
        });
      }

      request('https://api.foursquare.com/v2/venues/' + fsq.response.venues[0].id + '/photos?oauth_token=' + accessToken + '&v=20150905', function(error, response, body) {
        var items = JSON.parse(body).response.photos.items;

        var outie = [];
        var samplePhoto = '';

        for(i=0; i < items.length; i++){
          samplePhoto = items[i].prefix + items[i].width + 'x' + items[i].height + items[i].suffix;
          outie.push(samplePhoto);
        }

        res.send(outie);
      });
    });
});

/**
 *
 */
router.get('/photos', function(req, res) {
  var token = req.query.access_token;
  res.send(req.url);
});

module.exports = router;
