var express = require('express');
var router = express.Router();
var mail = require('../function/mailsend');
var md5  =require('md5');

/* GET users listing. */
router.post('/', function(req, res, next) {
  var email = req.body.email;    //注册的邮箱
  var vericode = ('000000' + Math.floor(Math.random() *  999999)).slice(-6) //随机生成的6位验证码
  req.session.email = email;
  req.session.vericode = vericode;
  mail.verifi(email,vericode,(error) => {
  	if(error){
  		res.json({sent:"error"});
  	}else{
  		res.json({sent:md5(String(vericode))});
  	}
  })
});

module.exports = router;
