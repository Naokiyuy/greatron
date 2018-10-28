import _ from 'lodash';
import Models from "../../../models";

const controller = {
  routes,
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  queryCategoryById
};

export default controller;

function routes(app) {
  app.all('/api/categories/list', controller.listCategories);
  app.all('/api/categories/create', controller.createCategory);
  app.all('/api/categories/update', controller.updateCategory);
  app.all('/api/categories/delete', controller.deleteCategory);
  app.all('/api/categories/query', controller.queryCategoryById);
}

function listCategories(req, res, next) {
  Models.Category.findAll().then(categories => {
    console.log(categories);
    return res.type('application/json').send(categories);
  });
}

function createCategory(req, res, next) {
  const data = {
    ...req.body
  };
  return Models.sequelize.transaction(function (t) {
    return Models.Category.create(_.omitBy(data, _.isUndefined), {transaction: t}).then(c => {
      return res.type('application/json').send(c);
    }).then(r => {

    }).catch(e => {

    });
  });
}

function updateCategory(req, res, next) {
  const data = {
    ...req.body
  };
  return Models.sequelize.transaction(function (t) {
    return Models.Category.update(_.omitBy(data, _.isUndefined), {where: {id: req.body.id}}, {transaction: t}).then(c => {
      return res.type('application/json').send(c);
    }).then(r => {

    }).catch(e => next(e));
  });
}

function deleteCategory(req, res, next) {
  return Models.sequelize.transaction(t => {
    return Models.Category.destroy({where: {id: req.body.id}}, {transaction: t}).then(c => {
      return res.type('application/json').send(c);
    });
  })
}

function queryCategoryById(req, res, next) {
  return Models.Category.findById(req.query.id).then(product => res.type('application/json').send(product)).catch(e => next(e));
}
