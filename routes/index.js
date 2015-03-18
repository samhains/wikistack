var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var models = require('../models/');
	models.Page.find({}, function(err, docs) {
		res.render('index', {docs:docs});
	});
});

module.exports = router;
