var express = require('express');
var router = express.Router();

/* GET help page. */
router.get('/', function(req, res, next) {
  res.render('feedback', { title: 'Feedback' });
});

module.exports = router;
