import randomString from 'random-string';

const controller = {
  routes,
  uploadFile
};

export default controller;

function routes(app) {
  app.post('/api/file/upload', controller.uploadFile);
}

function uploadFile(req, res, next) {
  let files = req.files;
  if (!files)
    return res.status(400).send('No files were uploaded.');

  let uploadFile = files.file;
  const filepath = `/vol/web/upload/`;
  const filename = `${randomString()}.jpg`;
  uploadFile.mv(filepath + filename, function(err) {
    if (err) {
      return next(err);
    }

    res.type('application/json').send({status: 'success', filename: filename});
    return null;
  });
}
