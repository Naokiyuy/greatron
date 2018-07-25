import React, {Component} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as actionCreators from './listProductsReducer';

@reduxForm({
  form: 'productqueryform',
  fields: ['product_category', 'product_name']
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

  render() {
    const {listproducts, handleSubmit, fields: {product_category, product_name}} = this.props;
    return (
      <div className="backend_wrapper">
        <Link to="/backend/add-product" className="addproduct"><i className="fa fa-plus"/> Add Product</Link>

        <React.Fragment>
          <div className="product-item">
            <form>
              <table>
                <thead>
                <tr>
                  <th>Image</th>
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
                    <select className="index_1" {...product_category}>
                      <option value=""></option>
                      <option value="DESKTOP">DESKTOP</option>
                      <option value="WALLPLUG">WALLPLUG</option>
                      <option value="USBCHARGER">USBCHARGER</option>
                      <option value="WIRELESS">WIRELESS</option>
                    </select>
                  </th>
                  <th><input className="index_1" type="text" {...product_name}/></th>
                  <th/>
                  <th/>
                  <th/>
                  <th>
                    <button type="button">Reset</button>
                  </th>
                </tr>
                </thead>
                <tbody>
                {listproducts && listproducts.map(p =>
                  <tr>
                    <td width="10%" valign="top"><img src={`/upload`} alt=""/></td>
                    <td width="10%" valign="top">{p.product_name}</td>
                    <td width="20%">{p.product_desc}</td>
                    <td width="25%" valign="top">{p.product_spec}</td>
                    <td width="25%" valign="top">
                      <h6>Feature</h6>
                      <p>{p.feature}</p>

                      <p>Contact Person:</p>
                      <p>e-mail: carsonhuang@gec-powersupply.com</p>
                      <p>e-mail: gechuang@ms3.hinet.net</p>
                      <p>Main Export Market</p>
                      <p>Asia ,Australia ,Europe ,New Zealand ,United States of America</p>
                      <p>Main Export Market</p>
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
        </React.Fragment>
      </div>
    );
  }
}
