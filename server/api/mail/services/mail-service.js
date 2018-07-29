import nodeMailer from 'nodemailer';

const services = {
  sendMail
};

export default services;

function sendMail(params, callback) {
  const mailOptions = {
    ...params,
    from: params.from || config.get('mail:sender')
  };
  sendMailService(mailOptions, callback);
}

function sendMailService(mailOptions, callback) {
  const smtpTransport = nodeMailer.createTransport({
    debug: false,
    logger: true,
    host: 'localhost',
    port: 25,
    secure: false,
    direct: true,
    ignoreTLS: true,
    tls: {
      rejectUnauthorized: false
    }
  });

  smtpTransport.sendMail(mailOptions, function(err, res) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(err, res.message);
    }
  });
}
