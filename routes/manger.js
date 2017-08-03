var express = require('express');
var router = express.Router();
var mongo   =  require('../function/account.js');
var checknotLogin = require('../check/check').checknotLogin;
/* GET manger listing. */
router.get('/',checknotLogin, function(req, res, next) {
    var userlist = [];
    mongo.userlist(function(err,person){
    if(err){
         res.send("系统错误");
    }else{
        person.map(function(data){
            userlist.push(data.name);
        })
    }
})
    mongo.lookuser(req.session.username,(name,person) => {

	if(name){
	    res.render("manger",{
    	username:req.session.username,
    	sex: person.sex,
    	intro: person.intro,
    	birth: person.birth,
    	avator: "/images/avator/" + person.avator + ".jpg",
        userlist: userlist

    });
	}else{
		res.send("系统错误");
	}

	})


});

module.exports = router;
