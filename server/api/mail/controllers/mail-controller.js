import mailService from '../services/mail-service';

const controller = {
  routes,
  sendMail
};

export default controller;

function routes(app) {
  app.post('/send-mail', controller.sendMail);
}

function sendMail(req, res, next) {
  const params = req.body;

  mailService.sendMail(params, (err, results) => {
    if (err) {
      return next(err);
    }

    res.type('application/json').send(results);
    return null;
  });
}
