var express =  require('express');
var router  =  express.Router();
var fs      =  require('fs');
var mongo   =  require('../function/account.js');
var multer  =  require('multer');
var md5     =  require('md5');
var mailsend = require('../function/mailsend');
var avatornum = Math.floor(Math.random()*1000000);  //上传头像的尾号

var picture = ["jpg","jpeg","png","bmp"];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/avator/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.sgname  + avatornum +  ".jpg" );
  }
});

var upload = multer({ storage: storage });
/* GET signup listing. */  
/* 用户注册 */
router.post('/', upload.single('sgavator'),function(req, res, next) {
  var sgname = req.body.sgname;    //用户名
  var sex = req.body.sex;      // 用户性别
  var sgpd1 = req.body.sgpd1;      //用户密码
  var sgbirth = req.body.sgbirth.toString();  //出生日期
  var email = req.body.signupemail;  //用户邮箱
  var vericode = req.body.vericode;   //邮箱验证码
  var sgintro = req.body.sgintro;   //个人简介
  var file = req.file;
  console.log(sgbirth);
  
  //上传头像文件如果不是图像格式文件,报错并删除上传文件
  if (picture.indexOf(file.originalname.split('.')[1]) == -1){
      res.send("上传头像必须是图像格式");
      fs.unlink(file.path);
    };
  
  //输入邮箱账号不是获取验证码的邮箱则报错
  if(email != req.session.email){
     res.send("邮箱账号输入的不对");
  }

  //输入的验证码与发送的验证码不符合 报错
  if(vericode != req.session.vericode){
     res.send("验证码不对");
  }

//注册的用户名如果已经存在则报错
  mongo.lookuser(sgname,(signed,person) => {
	if(signed){
		// res.json({status:"namesigned"});
     res.send("用户名已经注册过了");
	}else{
		mongo.signup(sgname,sex,sgbirth,md5(sgpd1.toString() + "mimajiamizifu"),email,sgintro,sgname+avatornum,(err) => {
		 if(err){
		 	res.send("对不起,注册失败,");
		 }else{
      mailsend.welcmsign(email,sgname,(err) => {
        if(err){
          console.log("成功注册邮件发送失败");
        }else{
           console.log("成功注册邮件已经发送");
        }
      })
      req.session.username = sgname;
		 	res.redirect("home");	 	
		 }
		})
    console.log(sgname + "还没有注册了"); 
	}

	})

});

module.exports = router;
