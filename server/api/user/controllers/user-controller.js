import Models from '../../../models';
import passport from 'passport';
require('../../../config/passport/passport.js')(passport, Models.User);

const controller = {
  routes,
  signin
};

export default controller;

function routes(app) {
  app.post('/api/login', controller.signin);
}

function signin(req, res, next) {
  passport.authenticate('local-signin', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.type('application/json').send({status: 500, pathname: '/backend/login'});
    }
    req.logIn(user, {}, function(err) {
      if (err) {
        return next(err);
      }

      req.session.authenticated = true;
      return res.type('application/json').send({status: 200, pathname: '/backend/list-products'});
    });
  })(req, res, next);
}
