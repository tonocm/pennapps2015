var express = require('express');
var request = require('request');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../models/user');
var Location = require('../models/location');

var ELASTICSEARCH = 'http://localhost:9200';
//var ELASTICSEARCH = process.env.ELASTICSEARCH_URL;

/**
 * Show the API URLs.
 */
router.get('/', function(req, res) {
  return res.json({
    root_url: '/',
    location_url: '/locations',
    vendor_url: '/vendor',
    user_url: '/users',
    token_url: '/token'
  });
});

/**
 * Create a new location.
 */
router.post('/locations', function(req, res){
  var location = {
    lat: req.body.lat,
    long: req.body.long,
    title: req.body.title,
    description: req.body.description,
    username: req.body.username,
    photos: req.body.photos,
    price: req.body.price,
    tags: req.body.tags,
    attributes: req.body.attributes
  };

  request.post({
    url: ELASTICSEARCH + '/locations/location/',
    json: location
  }, function(error, response, body) {
    res.json({
      data: {
        id: response.body._id,
        type: 'locations',
        attributes: location
      }
    });
  });
});

/**
 * Create a new user.
 */
router.post('/users', function(req, res) {
  var user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address_1: req.body.address_1,
    address_2: req.body.address_2,
    bio: req.body.bio,
    username: req.body.username,
    photo: req.body.photo
  };

  // Save the user in ES
  request.post({
    url: ELASTICSEARCH + '/users/user/',
    json: user
  }, function(error, response, body) {
    res.json({
      data: {
        id: response.body._id,
        type: 'users',
        attributes: user
      }
    });
  });
});

/**
 * Get all users.
 */
router.get('/users', function(req, res) {
  return request.post({url: ELASTICSEARCH + '/users/user/_search', json: {'query': {'match_all': {}}}}, function(error, response, body) {
    if (!body.error) {
      res.json({
        data: body.hits.hits.map(function (user) {
          var data = user._source;
          var id = user._id;

          return {
            id: id,
            type: 'users',
            attributes: {
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              address_1: data.address_1,
              address_2: data.address_2,
              bio: data.bio,
              photo: data.photo,
              username: data.username
            }
          };
        })
      });
    } else {
      res.status(500);
      res.json({
        message: 'An error occured.',
        error: body.error
      });
    }
  });
});

/**
 * Get specific user.
 */
router.get('/users/:username', function(req, res) {
  return request.post({url: ELASTICSEARCH + '/users/user/_search', json: {"query": {"filtered" : {"query" : {'match_all': {}},"filter" : {"term" : { "username" : req.params.username }}}}}}, function(error, response, body) {
    if (!body.error) {
      res.json({
        data: body.hits.hits.map(function (user) {
          var data = user._source;
          var id = user._id;

          return {
            id: id,
            type: 'users',
            attributes: {
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              address_1: data.address_1,
              address_2: data.address_2,
              bio: data.bio,
              photo: data.photo,
              username: data.username
            }
          };
        })
      });
    } else {
      res.status(500);
      res.json({
        message: 'An error occured.',
        error: body.error
      });
    }
  });
});



/**
 * Get all locations.
 */
router.get('/locations', function(req, res) {
  return request.post({
    url: ELASTICSEARCH + '/locations/location/_search',
    json: {
      'query': {
        'match_all': {}
      }
    }
  }, function(error, response, body) {
    if (!body.error) {
      res.json({
        data: body.hits.hits.map(function (location) {
          var data = location._source;
          var id = location._id;

          return {
            id: id,
            type: 'locations',
            attributes: {
              title: data.title,
              description: data.description,
              photos: data.photos,
              lat: data.lat,
              long: data.long,
              features: data.attributes,
              tags: data.tags,
              price: data.price
            }
          };
        })
      });
    } else {
      res.status(500);
      res.json({
        message: 'An error occured.',
        error: body.error
      });
    }
  });
});

/**
 * Get specifc location.
 */
router.get('/locations/:id', function(req, res) {
  return request.post({url: ELASTICSEARCH + '/locations/location/_search', json: {"query": {"filtered" : {"query" : {'match_all': {}},"filter" : {"term" : { "id" : req.params.id }}}}}}, function(error, response, body) {
    if (!body.error) {
      res.json({
        data: body.hits.hits.map(function (location) {
          var data = location._source;
          var id = location._id;

          return {
            id: id,
            type: 'locations',
            attributes: {
              title: data.title,
              description: data.description,
              photos: data.photos,
              lat: data.lat,
              long: data.long,
              features: data.attributes,
              tags: data.tags,
              price: data.price
            }
          };
        })
      });
    } else {
      res.status(500);
      res.json({
        message: 'An error occured.',
        error: body.error
      });
    }
  });
});

module.exports = router;
