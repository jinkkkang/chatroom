/*
verificode  邮箱获取验证码
signup      注册
login       登录
forgetpd    忘记密码
home        主页面
manger      账户管理
userlist    用户列表
changepd    修改密码
upload      头像上传
editinfo    修改个人信息
personinfo  获取用户列表中的个人列表
logout      退出登录
search      搜索聊天记录
 */

var checknotLogin = require('../check/check').checknotLogin;
module.exports = function(app) {
    app.get('/', function(req, res) {
            //res.render("index");
            res.redirect("loginpage")
    });
	app.use('/verificode', require('./verificode'));
	app.use('/loginpage', require('./loginpage'));
	app.use('/signup', require('./signup'));
	app.use('/login', require('./login'));
	app.use('/forgetpd', require('./forgetpd'));
	app.use('/home', require('./home'));
	app.use('/manger', require('./manger'));
	app.use('/userlist', require('./userlist'));
	app.use('/changepd', require('./changepd'));
	app.use('/upload', require('./upload'));
	app.use('/editinfo', require('./editinfo'));
	app.use('/personinfo', require('./personinfo'));
	app.use('/search', require('./search'));
	app.use('/logout', require('./logout'));


};
