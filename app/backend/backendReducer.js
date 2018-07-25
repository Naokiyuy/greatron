import {combineReducers} from 'redux';
import loginReducere from './content/longinReducer';
import listProductsReducer from './content/listProductsReducer';
import productDetailReducer from './content/productDetailReducer';
import addorEditProductReducer from './content/addorEditProductReducer';

export default combineReducers({
  login: loginReducere,
  productlist: listProductsReducer,
  productdetail: productDetailReducer,
  productaddoredit: addorEditProductReducer
});
