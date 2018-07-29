import _ from 'lodash';
import Models from '../../../models';

const controller = {
  routes,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  queryProductById,
  queryProductByCategory,
  queryProductByParameters
};

export default controller;

function routes(app) {
  app.all('/api/products/list', controller.listProducts);
  app.post('/api/products/create', controller.createProduct);
  app.get('/api/products/query', controller.queryProductById);
  app.post('/api/products/update', controller.updateProduct);
  app.post('/api/products/delete', controller.deleteProduct);
  app.get('/api/products/query-by-category', controller.queryProductByCategory);
  app.get('/api/products/query-by-params', controller.queryProductByParameters);
}

function queryProductByCategory(req, res, next) {
  const condition = {
    where: {product_category: req.query.category},
    limit: _.toNumber(req.query.pageSize),
    offset: _.toNumber(req.query.offset)
  };
  return Models.Product.findAndCountAll(condition).then(result => res.type('application/json').send(result)).catch(e => next(e));
}

function queryProductById(req, res, next) {
  return Models.Product.findById(req.query.id).then(product => res.type('application/json').send(product)).catch(e => next(e));
}

function createProduct(req, res, next) {
  const data = {
    ...req.body
  };
  return Models.sequelize.transaction(function (t) {
    return Models.Product.create(_.omitBy(data, _.isUndefined), {transaction: t}).then(p => {
      return res.type('application/json').send(p);
    }).then(r => {

    }).catch(e => {

    });
  });
}

function updateProduct(req, res, next) {
  const data = {
    ...req.body,
    id: undefined
  };
  return Models.sequelize.transaction(function (t) {
    return Models.Product.update(_.omitBy(data, _.isUndefined), {where: {id: req.body.id}}, {transaction: t}).then(p => {
      return res.type('application/json').send(p);
    }).then(r => {

    }).catch(e => next(e));
  });
}

function deleteProduct(req, res, next) {
  return Models.sequelize.transaction(t => {
    return Models.Product.destroy({where: {id: req.body.id}}, {transaction: t}).then(p => {
      return res.type('application/json').send(p);
    });
  })
}

function listProducts(req, res, next) {
  Models.Product.findAll().then(products => {
    console.log(products);
    return res.type('application/json').send(products);
  });
}

function queryProductByParameters(req, res, next) {
  const where = _.omitBy({
    product_category: req.query.category,
    product_name: Models.sequelize.where(
      Models.sequelize.fn('LOWER', Models.sequelize.col('product_name')),
      'LIKE', `%${req.query.name ? req.query.name.toLowerCase() : ''}%`
    ),
    is_index: req.query.isIndex,
    is_new: req.query.isNew
  }, _.isUndefined);
  return Models.Product.findAndCountAll({where: where}).then(result => res.type('application/json').send(result)).catch(e => next(e));
}
