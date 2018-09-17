import {combineReducers} from 'redux';
import loginReducere from './content/longinReducer';
import listProductsReducer from './content/listProductsReducer';
import productDetailReducer from './content/productDetailReducer';
import addorEditProductReducer from './content/addorEditProductReducer';
import listCategoriesReducer from './content/listCategoriesReducer';
import addorEditCategoryReducer from './content/addorEditCategoryReducer';

export default combineReducers({
  login: loginReducere,
  productlist: listProductsReducer,
  productdetail: productDetailReducer,
  productaddoredit: addorEditProductReducer,
  categorylist: listCategoriesReducer,
  categoryaddoredit: addorEditCategoryReducer
});
