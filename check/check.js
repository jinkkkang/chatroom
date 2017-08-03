module.exports = {
  checknotLogin: function checkLogin(req, res, next) {
    if (!req.session.username) {
      return res.redirect('/');
    }
    next();
  },

  checkLogin: function checkNotLogin(req, res, next) {
    if (req.session.username) {
      return res.redirect('back');
    }
    next();
  }
};