var express = require('express');
var request = require('request');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../models/user');
var Location = require('../models/location');

var ELASTICSEARCH = 'http://localhost:9200';

/**
 * Show the API URLs.
 */
router.get('/', function(req, res) {
  return res.json({
    root_url: '/',
    search_tags: '/locations',
    search_attributes: '/users'
  });
});

router.get('/locations', function(req, res){
  request('http://localhost:9200/locations/location/_search?q=' + req.query.q, function(error, response, body){

    res.json(JSON.parse(body).hits.hits);

  });
});

router.get('/users', function(req, res){
  request('http://localhost:9200/users/user/_search?q=' + req.query.q, function(error, response, body){

    res.json(JSON.parse(body).hits.hits);

  });
});


module.exports = router;
