var express = require('express');
var router = express.Router();


/* GET login listing. */
router.get('/', function(req, res, next) {
   req.session.username=null;
   res.redirect('/loginpage');

});

module.exports = router;
