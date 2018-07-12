var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('app', { title: 'Express' , userName: "superAdmin", userType: "system admin"});
});

module.exports = router;
