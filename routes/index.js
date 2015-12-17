var express = require('express');
var router = express.Router();
var templateData = {};
templateData.title = 'Express';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', templateData);
  return;
});

module.exports = router;
