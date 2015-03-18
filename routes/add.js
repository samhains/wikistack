var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/',function(req,res,next){
	res.render('add_a_page');
});

router.post('/submit',function(req,res){
	var models = require('../models/');
	var title = req.body.pageTitle;
	var body = req.body.pageContent;
	var tags = req.body.pageTags.split(' ');
	var url_name = urlMaker(title);


	var p = new models.Page({ "title": title, "body": body, "url_name": url_name, "tags":tags });
	p.save();
	res.redirect('/');
});

module.exports = router;

function urlMaker(title) {
	if (title) return title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_');
	var newString = '';
	for (var i = 0; i < 12; i++) {
		newString += randLetter();
	}
	return newString;
}

function randLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}