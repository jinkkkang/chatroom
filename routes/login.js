var express = require('express');
var router = express.Router();
var mongo   =  require('../function/account.js');
var md5 = require("md5");

/* GET login listing. */
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  mongo.lookuser(username,(signed,person) => {

	if(!signed){
		res.json({status:"nouser"});
	}else{
		mongo.login(username,password,(loginok,person) => {
		if(loginok){
			 req.session.username = username;
			 res.json({status:"success"});
		}else{
			res.json({status:"fail"});
		}
	  })
	}

	})

});

module.exports = router;
