import {combineReducers} from 'redux';
import productsReducer from './products/productsReducer';
import indexProductsReducer from './home/indexPageReducer';
import searchModalReducer from '../components/header/searchModalReducer';

export default combineReducers({
  products: productsReducer,
  indexproducts: indexProductsReducer,
  search: searchModalReducer
});
