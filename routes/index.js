var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header('x-sidekick-org', '{"orgs": [{"id": "a", "name":"TestOrgA"},{"id": "a", "name":"TestOrgA"}]');
  res.render('index', { title: 'Home' });
});

module.exports = router;
