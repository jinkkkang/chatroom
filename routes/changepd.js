var express  = require('express');
var router   = express.Router();
var mongo    = require('../function/account.js');
var md5      = require('md5');

/* GET changepd listing. */
/* 用户修改密码*/
router.post('/', function(req, res, next) {
  var newpd  = req.body.newpd;
  var username = req.session.username;
  mongo.updatepd(username,newpd,(err) => {
  	if(err){
  		res.json({status: "fail"});
  	}else{
  		res.json({status: "success"});
  	}
  })

});

module.exports = router;
