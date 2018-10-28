import _ from 'lodash';
import Models from "../../../models";

const controller = {
  routes,
  listAboutuses,
  createAboutus,
  updateAboutus,
  deleteAboutus,
  queryAboutusById
};

export default controller;

function routes(app) {
  app.all('/api/aboutus/list', controller.listAboutuses);
  app.all('/api/aboutus/create', controller.createAboutus);
  app.all('/api/aboutus/update', controller.updateAboutus);
  app.all('/api/aboutus/delete', controller.deleteAboutus);
  app.all('/api/aboutus/query', controller.queryAboutusById)
}

function listAboutuses(req, res, next) {
  Models.Aboutus.findAll().then(aboutus => {
    console.log(aboutus);
    return res.type('application/json').send(aboutus);
  });
}

function createAboutus(req, res, next) {
  const data = {
    ...req.body
  };
  return Models.sequelize.transaction(function (t) {
    return Models.Aboutus.create(_.omitBy(data, _.isUndefined), {transaction: t}).then(a => {
      return res.type('application/json').send(a);
    }).then(r => {

    }).catch(e => {

    });
  });
}

function updateAboutus(req, res, next) {
  const data = {
    ...req.body
  };
  return Models.sequelize.transaction(function (t) {
    return Models.Aboutus.update(_.omitBy(data, _.isUndefined), {where: {id: req.body.id}}, {transaction: t}).then(a => {
      return res.type('application/json').send(a);
    }).then(r => {

    }).catch(e => next(e));
  });
}

function deleteAboutus(req, res, next) {
  return Models.sequelize.transaction(t => {
    return Models.Aboutus.destroy({where: {id: req.body.id}}, {transaction: t}).then(a => {
      return res.type('application/json').send(a);
    });
  })
}

function queryAboutusById(req, res, next) {
  return Models.Aboutus.findById(req.query.id).then(aboutus => res.type('application/json').send(aboutus)).catch(e => next(e));
}
