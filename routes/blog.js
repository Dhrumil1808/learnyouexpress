var express = require('express');
var router = express.Router();
var templateData = {};
templateData.title = 'Blog Express';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog', templateData);
  return;
});

module.exports = router;
