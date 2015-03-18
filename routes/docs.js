var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET users listing. */
router.get('/:url_name', function(req, res, next) {
  var url_name = req.params.url_name;
  models.Page.findOne({url_name:url_name},function(err,page){

  	res.render('doc',page);
  });
});
 
module.exports = router;
