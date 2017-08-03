var express = require('express');
var router = express.Router();
var mongo   =  require('../function/account.js');
var multer = require('multer');
var avatornum = Math.floor(Math.random()*1000000)  //上传头像的尾号
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/avator/')
  },
  filename: function (req, file, cb) {
    cb(null, req.session.username  + avatornum + ".jpg" );
  }
})

var upload = multer({ storage: storage });
/* GET editinfo listing. */
router.post('/', upload.single('avator'),function(req, res, next) {
   var sex = req.body.sex;
   var intro = req.body.intro;
   var birth = req.body.birth;
   mongo.editinfo(req.session.username,sex,birth,intro,req.session.username + avatornum, (err,count) =>{
      if(err){
      	res.send("修改资料错误");
      }else{
        res.redirect('manger');
      }
   })

});

module.exports = router;