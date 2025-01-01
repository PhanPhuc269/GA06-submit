module.exports = {
  ensureLogin: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  },
  ensureAuthenticated:(req, res, next)=> {
    if (req.isAuthenticated()) {
        if (!req.user.isConfirmed) {
            return res.redirect('/verify'); // Redirect đến trang xác thực email
        }
        return next();
    }
     // Lưu URL hiện tại vào session
     req.session.returnTo = req.originalUrl;
     console.log('l: ', req.session.returnTo)
    res.redirect('/login'); // Redirect nếu chưa đăng nhập
  },  

  ensureRole: (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === role) {
        return next();
      } else {
        res.status(403).send('Access Denied');
      }
    };
  },
};