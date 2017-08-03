var express = require('express');
var router = express.Router();
var mongo   =  require('../function/account.js');

/* GET personinfo listing. 
   获取用户个人资料。
*/
router.post('/', function(req, res, next) {

	let username = req.body.username
	mongo.lookuser(username,(exist,person) => {
		if(exist){
			res.json({status:person});
		}else{
			res.json({status:"notexist"});
		}
	})

   

});

module.exports = router;
