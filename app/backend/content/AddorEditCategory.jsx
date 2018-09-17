import React, {Component} from 'react';
import * as actionCreators from "./addorEditCategoryReducer";
import {bindActionCreators} from "redux";
import {reduxForm} from 'redux-form';
import {browserHistory} from "react-router";

@reduxForm({
  form: 'addoreditcategoryform',
  fields: [
    'id', 'category'
  ],
  destroyOnUnmount: true
}, state => ({
  isEditing: state.backend.categoryaddoredit.isEditing,
  category: state.backend.categoryaddoredit.category,
  editingCategory: state.backend.categoryaddoredit.editingCategory
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class AddorEditCategory extends Component {
  componentWillMount() {
    const {params, category, queryCategory, editCategory, createCategory} = this.props;
    if (params.id) {
      editCategory();
      queryCategory(params.id).then(r => {
        this.props.initializeForm(this.props.editingCategory);
      });
    } else {
      createCategory();
      this.props.initializeForm(category);
    }
  }

  add = (values) => {
    const {addCategory} = this.props;
    addCategory(values).then(r => {
      browserHistory.push('/backend/list-categories');
    });
  };

  edit = (values) => {
    const {updateCategory} = this.props;
    updateCategory(values).then(r => {
      browserHistory.push('/backend/list-categories');
    });
  };

  render() {
    const {handleSubmit, isEditing, fields: {id, category}} = this.props;
    return (
      <div className="backend_wrapper">
        <form onSubmit={handleSubmit(isEditing ? this.edit : this.add)}>
          <div className="index_num">
            {isEditing && <h6>{id.value}</h6>}
            <div className="backend_row">
              <div className="upload_content">
                <input type="text" className="index_1" placeholder="Please input a category name" {...category}/>
              </div>
            </div>
          </div>
          <button type="submit" className="OK_comfirm">確認</button>
        </form>
      </div>
    );
  }
}
