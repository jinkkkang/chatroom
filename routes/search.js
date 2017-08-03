var express = require('express');
var router = express.Router();
var mongo   =  require('../function/account.js');

/* GET login listing. */
router.post('/', function(req, res, next) {

	var user    =  req.body.user;
	var date1   =  req.body.date1;
	var date2   =  req .body.date2;
	var content =  req.body.content;
	console.log(user);
	console.log(date1);
	console.log(date2);
	console.log(content);
   
	mongo.search(date1,date2,user,content,function(per){
		if(per){
			console.log(per);
			res.json({status: per});
		}else{
			res.json({status: null})
		}
	  })

	});

module.exports = router;
