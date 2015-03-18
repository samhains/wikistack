var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET users listing. */


router.get('/',function(req,res){
	var page_url = req.query.page;
	// find all pages that have any of the page tags
	models.Page.findOne({url_name:page_url},function(err,page){
		//found page - we need its tags
		//once we have tags, search for all other pages with tags

		var tags = page.tags;
		page.findSimilar(page_url,function(data){
			res.render('similar',{title: page_url, pages: data});
		});
		//for all tags, create list of pages with them,
		//excluding the page_url_page
	});
});

module.exports = router;