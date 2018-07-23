import React, {Component} from 'react';

export default class IndexPage extends Component {
  render() {
    return (
      <div className="backend_wrapper">
        {[0, 1, 2, 3].map((m, i) =>
          <div className="index_num">
            <h6>{i+1}</h6>
            <div className="backend_row">
              <div className="upload_img">圖片上傳</div>
              <p>product_01.jpg</p>
            </div>

            <div className="backend_row">
              <div className="upload_content">
                <input type="text" className="index_1" placeholder="請輸入標題"/>
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <textarea name="" id="" cols="30" rows="10" placeholder="請輸入內容"></textarea>
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <input type="text" className="index_1" placeholder="請輸入連結"/>
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <input type="text" className="index_1" placeholder="請輸入連結"/>
              </div>
            </div>
            <div className="backend_row">
              <div className="upload_content">
                <input type="checkbox" /> 新品
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
