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

            if(ret_json.response.venues.length === 0){
                res.send('No results found. Please try again');
            }



//            if (first_venue === undefined){
//                res.send('No results found. Please try again');
//            }
            else{
            var first_venue = ret_json.response.venues[0];
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

    request.post({url: elasticSearchURI, json: location}, function(error, response, body) {
    });

    res.send(location);
});

router.post('/post/user', function(req, res){

    var elasticSearchURI = 'http://localhost:9200/users/user/';

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address_1 = req.body.address_1;
    var address_2 = req.body.address_2;
    var bio = req.body.bio;
    var username = req.body.username;
    var photo = req.body.photo;

    var user = {'first_name':first_name, 'last_name':last_name, 'email':email, 'phone':phone, 'address_1':address_1, 'address_2':address_2, 'bio':bio, 'username':username, 'photo':photo};

    request.post({url: elasticSearchURI, json: user}, function(error, response, body) {
    });

    res.send(user);
});

router.get('/get/users', function(req, res){

    var elasticSearchURI = 'http://localhost:9200/users/user/_search';
    var selectAll = {'query':{'match_all':{}}};

    request.post({url: elasticSearchURI, json: selectAll}, function(error, response, body) {

        var arr = body.hits.hits; // this is an array
        res.send(arr);
    });

});

router.get('/get/locations', function(req, res){

    var elasticSearchURI = 'http://localhost:9200/locations/location/_search';
    var selectAll = {'query':{'match_all':{}}};

    request.post({url: elasticSearchURI, json: selectAll}, function(error, response, body) {

        var arr = body.hits.hits; // this is an array
        res.send(arr);
    });

});

module.exports = router;
