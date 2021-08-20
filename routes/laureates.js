var express = require('express');
var router = express.Router();

/* GET help page. */
router.get('/', function(req, res, next) {
  var {year, category} = req.query;
  res.render('laureates', { title: 'Laureate', year, category });
});

module.exports = router;
