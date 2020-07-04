'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class LoginController {
  /**
   * GET /login
   */
  index(req, res, next) {
    res.locals.email = '';
    res.locals.error = '';
    res.render('login');
  }

  /**
   * POST /login
   */
  async post(req, res, next) {
    try {
      // recoger los parámetros de entrada
      const email = req.body.email;
      const password = req.body.password;

      // buscar el user en la base de datos
      const user = await User.findOne({ email: email });

      // si no existe el user o la password no coincide
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.locals.email = email;
        res.locals.error = res.__('Invalid credentials');
        res.render('login');
        return;
      }

      req.session.authUser = {
        _id: user._id,
      };

      res.redirect('/personal');
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/loginJWT
   */
  async postJWT(req, res, next) {
    try {
      // recoger los parámetros de entrada
      const email = req.body.email;
      const password = req.body.password;

      // buscar el user en la base de datos
      const user = await User.findOne({ email: email });

      // si no existe el user o la password no coincide
      if (!user || !(await bcrypt.compare(password, user.password))) {
        const error = new Error('invalid credentials');
        error.status = 401;
        next(error);
        return;
      }

      // encuentro el user y la password es correcta

      // crear un JWT
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
      });

      // responder
      res.json({ token: token });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /logout
   */
  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    });
  }
}

module.exports = new LoginController();
