import React, {Component} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as actionCreators from './listProductsReducer';

@reduxForm({
  form: 'productqueryform',
  fields: ['category', 'name', 'isNew', 'isIndex']
}, state => ({
  listproducts: state.backend.productlist.list
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListProducts extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }

  deleteProduct = (id) => {
    const {list, deleteProduct} = this.props;
    deleteProduct(id).then(() => {
      list();
    });
  };

  searchProducts = () => setTimeout(() => this.props.searchProducts(this.props.values), 0);

  render() {
    const {listproducts, handleSubmit, searchProducts, resetSearch, fields: {category, name, isNew, isIndex}} = this.props;
    return (
      <div className="backend_wrapper">
        <Link to="/backend/add-product" className="addproduct"><i className="fa fa-plus"/> Add Product</Link>
        <div className="product-item">
          <form onSubmit={handleSubmit(searchProducts)} onChange={this.searchProducts}>
            <table>
              <thead>
              <tr>
                <th>Image</th>
                <th>Index Products</th>
                <th>New Product</th>
                <th>Category</th>
                <th>Name</th>
                <th>Description</th>
                <th>Spec.</th>
                <th>Feature(others)</th>
                <th>Actions</th>
              </tr>
              <tr>
                <th/>
                <th>
                  <select {...isIndex}>
                    <option value=""></option>
                    <option value="true">Index Product</option>
                  </select>
                </th>
                <th>
                  <select {...isNew}>
                    <option value=""></option>
                    <option value="true">New Product</option>
                  </select>
                </th>
                <th>
                  <select className="index_1" {...category}>
                    <option value=""></option>
                    <option value="DESKTOP">DESKTOP</option>
                    <option value="WALLPLUG">WALLPLUG</option>
                    <option value="USBCHARGER">USBCHARGER</option>
                    <option value="WIRELESS">WIRELESS</option>
                  </select>
                </th>
                <th><input className="index_1" type="text" {...name}/></th>
                <th/>
                <th/>
                <th/>
                <th>
                  <button type="button" onClick={resetSearch}>Reset</button>
                </th>
              </tr>
              </thead>
              <tbody>
              {listproducts && listproducts.map(p =>
                <tr>
                  <td width="10%" valign="top"><img src={`/upload/${p.image_url}`} alt=""/></td>
                  <td>{p.is_index && <i className="far fa-2x fa-check-circle"/>}</td>
                  <td>{p.is_new && <i className="far fa-2x fa-check-circle"/>}</td>
                  <td width="10%" valign="top">{p.product_category}</td>
                  <td width="10%" valign="top">{p.product_name}</td>
                  <td width="20%">
                    <div dangerouslySetInnerHTML={{__html: p.product_desc}}/>
                  </td>
                  <td width="25%" valign="top">
                    <div dangerouslySetInnerHTML={{__html: p.product_spec}}/>
                  </td>
                  <td width="25%" valign="top">
                    <div dangerouslySetInnerHTML={{__html: p.feature}}/>
                  </td>
                  <td width="10%">
                    <div className="btn">
                      <Link className="edit" to={`/backend/edit-product/${p.id}`}>編輯</Link>
                      <div className="cancel" onClick={() => this.deleteProduct(p.id)}>刪除</div>
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
}
