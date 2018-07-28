import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreators from './addorEditProductReducer';
import FileUpload from '../../utils/fileupload/FileUpload';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

@reduxForm({
  form: 'addoreditproductform',
  fields: [
    'id', 'product_category', 'product_name', 'product_desc', 'productDescEditor', 'product_spec', 'productSpecEditor',
    'pdf_url', 'sub_title', 'feature', 'featureEditor', 'image_url'
  ],
  destroyOnUnmount: true
}, state => ({
  isEditing: state.backend.productaddoredit.isEditing,
  product: state.backend.productaddoredit.product
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class AddorEditProduct extends Component {
  componentWillMount() {
    const {params, product, queryProduct, editProduct} = this.props;
    if (params.id) {
      editProduct();
      queryProduct(params.id).then(r => {
        this.props.initializeForm(this.props.product);
      });
    } else {
      this.props.initializeForm(product);
    }
  }

  add = (values) => {
    const {addProduct} = this.props;
    addProduct(values).then(r => {
      browserHistory.push('/backend/list-products');
    });
  };

  edit = (values) => {
    const {updateProduct} = this.props;
    updateProduct(values).then(r => {
      browserHistory.push('/backend/list-products');
    });
  };

  onChange = (value, textField, editor) => {
    editor.onChange(value);
    textField.onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };

  render() {
    const {
      handleSubmit, addProduct, isEditing,
      fields: {
        id, product_category, product_name, product_desc, productDescEditor, product_spec, productSpecEditor,
        pdf_url, sub_title, feature, featureEditor, image_url
      }
    } = this.props;
    return (
      <div className="backend_wrapper">
        <form onSubmit={handleSubmit(isEditing ? this.edit : this.add)}>
          <div className="index_num">
            {isEditing && <h6>{id.value}</h6>}
            <div className="backend_row">
              <FileUpload type="image" fileField={image_url} message="請上傳圖片"/>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <select className="index_1" {...product_category}>
                  <option value="DESKTOP">DESKTOP</option>
                  <option value="WALLPLUG">WALLPLUG</option>
                  <option value="USBCHARGER">USBCHARGER</option>
                  <option value="WIRELESS">WIRELESS</option>
                </select>
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <input type="text" className="index_1" placeholder="請輸入標題" {...product_name}/>
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <Editor id={"description"}
                        editorState={productDescEditor.value}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={(v) => this.onChange(v, product_desc, productDescEditor)}
                />
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <Editor id={"spec"}
                        editorState={productSpecEditor.value}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={(v) => this.onChange(v, product_spec, productSpecEditor)}
                />
              </div>
            </div>
            <div className="backend_row">
              <FileUpload type="file" fileField={pdf_url} message="PDF 上傳"/>
            </div>

            <div className="backend_row">
              <div className="upload_content">
                <input type="text" className="index_1" placeholder="請輸入小標題" {...sub_title}/>
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <Editor id={"spec"}
                        editorState={featureEditor.value}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={(v) => this.onChange(v, feature, featureEditor)}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="OK_comfirm">確認上傳</button>
        </form>
      </div>
    );
  }
}
