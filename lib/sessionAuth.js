'use strict';

module.exports = function (rolesToValidate) {
  return function (req, res, next) {
    // verificar quién pide la página
    if (!req.session.authUser) {
      res.redirect('/login');
      return;
    }
    next();
  };
};
