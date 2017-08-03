var express = require('express');
var router = express.Router();
var mongo   =  require('../function/account.js');
var checknotLogin = require('../check/check').checknotLogin;
/* GET login listing. */
router.get('/',checknotLogin,function(req, res, next) {

    if(!req.session.username){
        res.redirect("loginpage");
    }
    console.log(req.session);
    mongo.lookuser(req.session.username,(name,person) => {

	if(name){
	    res.render("home",{
    	username:req.session.username,
    	sex: person.sex,
    	intro: person.intro,
        birth: person.birth,
    	avator: "/images/avator/" + person.avator + '.jpg'

    });
	}else{
		res.send("系统错误");
	}

	})

 });

module.exports = router;
