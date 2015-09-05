var express = require('express');
var router = express.Router();
var request = require("request");
var clientID = 'TJD25UZFTFKY0Q2AYNJUDCDKIEVYY25CTMLHO4AQYDQTK2NH';
var clientSecret = 'GF3SBUHKMSFWU5XYXTSW2MPD2BKIBL103PVAYZUZB1WECMJM&';
var redirectURI = 'http://pennapps2015.cloudapp.net:3000/api/get/location/photos/render';
var accessToken = 'F4WDV0ZNYAQDVXYNUASH1N4SOIP0425SCAK3PVKYB43IMK3M';
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

            var ret_json = JSON.parse(body);
            var first_venue = ret_json.response.venues[0];

            if (first_venue.id === undefined){
                res.send('No results found. Please try again');
            }
            else{
                var photo_url = 'https://api.foursquare.com/v2/venues/' + first_venue.id + '/photos?oauth_token=' + accessToken + '&v=20150905';

                request(photo_url, function(error, response, body) {

                    //var bod = JSON.parse(body);
                    var items = JSON.parse(body).response.photos.items;
                    var outie = '';
                    var samplePhoto = '';
                    for(i=0; i < items.length; i++){
                        samplePhoto = items[i].prefix + items[i].width + 'x' + items[i].height + items[i].suffix;
                        outie = outie + '<img src=' + samplePhoto + ' height=' + items[i].height + ' width=' + items[i].width + '>\n';
                    }

                    res.send(outie);
                });
            }
        });
    }
});


router.get('/get/location/photos/render', function(req, res){
    var token = req.query.access_token;

    //var type = window.location.hash.slice(1);

    res.send(req.url);
});

router.post('/post/location', function(req, res){

    var elasticSearchURI = 'http://localhost:9200/locations/location/';

    var lat = req.body.lat;
    var long = req.body.long;
    var title = req.body.title;
    var desc = req.body.description;
    var username = req.body.username;
    var photos = req.body.photos;
    var price = req.body.price;
    var tags = req.body.tags;
    var attrs = req.body.attributes;

    var location = {'lat':lat, 'long':long, 'title':title, 'description':desc, 'username':username, 'photos':photos, 'price':price, 'tags':tags, 'attributes':attrs};
    console.log(location);
    request.post({url: elasticSearchURI, body: location}, function(error, response, body) {
        console.log(body);
    });
    res.send(req.body.name);
});


module.exports = router;
