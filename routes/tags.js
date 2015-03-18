var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET users listing. */


router.get('/',function(req,res){
	res.render('tags');
});

router.post('/submit',function(req,res){
	
	var tag = req.body.tagName;
	res.redirect('/tags/'+tag);


	

});

router.get('/:tagName',function(req,res){
	var tagName = req.params.tagName;

	models.Page.findByTag([tagName],function(err,pages){
		
		res.render('tags',{pages:pages});
	});

});

module.exports = router;
