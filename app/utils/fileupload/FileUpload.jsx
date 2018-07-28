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
    const {fileField, type, message} = this.props;
    if (type === 'image') {
      return (
        <Dropzone onDrop={(file) => this.uploadFile(file)}
                  className="fileupload"
                  multiple={false}
                  style={{cursor: 'pointer', borderColor: '#666', borderStyle: 'dashed', borderRadius: '5px'}}
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
            <h4 className="sbold">{message}</h4>
          </div>
          }
        </Dropzone>
      );
    } else {
      return (
        <Dropzone onDrop={(file) => this.uploadFile(file)}
                  className="fileupload"
                  multiple={false}
                  style={{cursor: 'pointer', borderColor: '#666', borderStyle: 'dashed', borderRadius: '5px'}}
        >
          {fileField.value &&
          <div className="text-center"
               style={{height: '50px', verticalAlign: 'middle'}}>
            <a href={`/upload/${fileField.value}`} target="_blank" download>
              下載 PDF 檔案
            </a>
          </div>
          }
          {!fileField.value &&
          <div className="text-center"
               style={{height: '50px', verticalAlign: 'middle'}}>
            <h4 className="sbold">{message}</h4>
          </div>
          }
        </Dropzone>
      );
    }
  }
}
