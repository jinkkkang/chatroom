var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
    if(req.session.username){
    	res.redirect('home');
    }else{
    	res.render("index");
    }
});

module.exports = router;
