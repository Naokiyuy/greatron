import Models from '../../../models';

const controller = {
  routes,
  listProducts
};

export default controller;

function routes(app) {
  app.all('/api/products/list', controller.listProducts);
}

function queryProductById(req, res, next) {

}

function createProduct(req, res, next) {

}

function updateProduct(req, res, next) {

}

function deleteProduct(req, res, next) {

}

function listProducts(req, res, next) {
  Models.Product.findAll().then(products => {
    console.log(products);
    return res.type('application/json').send(products);
  });
}
