import React, {Component} from 'react';
import {Link} from "react-router";
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as actionCreators from './listCategoriesReducer';

@reduxForm({
  form: 'listcategories',
  fields: ['category']
}, state => ({
  listcategories: state.backend.categorylist.list
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListCategories extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }

  deleteCategory = (id) => {
    const {list, deleteCategory} = this.props;
    deleteCategory(id).then(() => {
      list();
    });
  };

  searchCategories = () => setTimeout(() => this.props.searchCategories(this.props.values), 0);

  render() {
    const {handleSubmit, searchCategories, listcategories} = this.props;
    return (
      <div className="backend_wrapper">
        <Link to="/backend/add-category" className="addproduct"><i className="fa fa-plus"/> Add Category</Link>
        <div className="product-item">
          <form onSubmit={handleSubmit(searchCategories)} onChange={this.searchCategories}>
            <table>
              <thead>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {listcategories && listcategories.map(c =>
                <tr>
                  <td>{c.id}</td>
                  <td>{c.category}</td>
                  <td>
                    <div className="btn">
                      <Link className="edit" to={`/backend/edit-category/${c.id}`}>編輯</Link>
                      <div className="cancel" onClick={() => this.deleteCategory(c.id)}>刪除</div>
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
