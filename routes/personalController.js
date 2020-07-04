'use strict';

class PersonalController {
  index(req, res, next) {
    res.render('personal');
  }
}

module.exports = new PersonalController();
