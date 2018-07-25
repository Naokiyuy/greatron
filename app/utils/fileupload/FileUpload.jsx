import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './fileUploadReducer';

@connect(state => ({

}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class FileUpload extends Component {
  uploadFile = (file) => {
    const {fileUpload, fileField} = this.props;
    fileUpload(file).then(r => {
      fileField.onChange(r.filename);
    });
  };

  render() {
    const {fileField} = this.props;
    return (
      <Dropzone onDrop={(file) => this.uploadFile(file)}
                className="fileupload"
                multiple={false}
      >
        {fileField.value &&
        <div className="text-center"
             style={{height: '150px', verticalAlign: 'middle'}}>
          <img src={`/upload/${fileField.value}`} style={{height: '100%'}}/>
        </div>
        }
        {!fileField.value &&
        <div className="text-center"
             style={{height: '150px', verticalAlign: 'middle'}}>
          <h4 className="sbold">請上傳圖片</h4>
        </div>
        }
      </Dropzone>
    );
  }
}
