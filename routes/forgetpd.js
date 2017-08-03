var express =  require('express');
var router  =  express.Router();
var mongo   =  require('../function/account.js');
var mail = require('../function/mailsend');

/* GET forgetpd listing. */
/* 用户忘记密码 */
router.post('/', function(req, res, next) {
  var forgetname = req.body.forgetname;
  var forgetmail = req.body.forgetmail;
  var email = req.body.email;
  mongo.lookuser(forgetname,(signed,person) => {
	if(!signed){
		res.json({status:"noname"});
	}else{
		mongo.getpd(forgetname,forgetmail,(getok,person) => {
		if(getok){
			var newpassword = String(Math.floor(Math.random()*1000000));
			mongo.updatepd(forgetname,newpassword,(err,count) => {
			  if(err){
			  	console.log(err)
			  }else{
			  	mail.sendnewpd(forgetmail,forgetname,newpassword,(err) => {
			  		if(err){
			  			res.json({status:"getfail"});
			  		}else{
			  			res.json({status:"getyes"});
			  		}
			  	})
			  }

			})
		}else{
			res.json({status:"getno"});
		}
	  })
	}

	})

});

module.exports = router;
