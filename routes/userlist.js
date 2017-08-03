var express = require('express');
var router = express.Router();
var mongo   =  require('../function/account.js');

/* GET userlist listing. 
   获取用户列表
*/

router.get('/', function(req, res, next) {
var userlist = [];
   mongo.userlist(function(err,person){
	if(err){
		 res.json({status:"err"})
	}else{
		person.map(function(data){
			userlist.push(data.name);
		})
		res.json({status:userlist});
	}
})

});

module.exports = router;
