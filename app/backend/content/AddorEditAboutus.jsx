import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {reduxForm} from 'redux-form';
import {browserHistory} from "react-router";
import * as actionCreators from './addorEditAboutusReducer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

@reduxForm({
  form: 'addoreditaboutusform',
  fields: [
    'id', 'title', 'description'
  ],
  destroyOnUnmount: true
}, state => ({
  isEditing: state.backend.aboutusaddoredit.isEditing,
  aboutus: state.backend.aboutusaddoredit.category,
  editingAboutus: state.backend.aboutusaddoredit.editingAboutus
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class AddorEditAboutus extends Component {
  componentWillMount() {
    const {params, aboutus, queryAboutus, editAboutus, createAboutus} = this.props;
    if (params.id) {
      editAboutus();
      queryAboutus(params.id).then(r => {
        this.props.initializeForm(this.props.editingAboutus);
      });
    } else {
      createAboutus();
      this.props.initializeForm(aboutus);
    }
  }

  add = (values) => {
    const {addAboutus} = this.props;
    addAboutus(values).then(r => {
      browserHistory.push('/backend/list-aboutus');
    });
  };

  edit = (values) => {
    const {updateAboutus} = this.props;
    updateAboutus(values).then(r => {
      browserHistory.push('/backend/list-aboutus');
    });
  };

  handleChange = (v, f) => {
    f.onChange(v);
  };

  render() {
    const {handleSubmit, isEditing, fields: {id, title, description}} = this.props;
    return (
      <div className="backend_wrapper">
        <form onSubmit={handleSubmit(isEditing ? this.edit : this.add)}>
          <div className="index_num">
            {isEditing && <h6>{id.value}</h6>}
            <div className="backend_row">
              <div className="upload_content">
                <input type="text" className="index_1" placeholder="請輸入標題" {...title}/>
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <ReactQuill value={description.value} onChange={v => this.handleChange(v, description)} />
              </div>
            </div>
          </div>
          <button type="submit" className="OK_comfirm">確認</button>
        </form>
      </div>
    );
  }
}
