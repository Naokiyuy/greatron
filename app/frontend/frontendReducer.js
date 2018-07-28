import {combineReducers} from 'redux';
import productsReducer from './products/productsReducer';
import indexProductsReducer from './home/indexPageReducer';

export default combineReducers({
  products: productsReducer,
  indexproducts: indexProductsReducer
});
