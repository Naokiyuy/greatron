import React, {Component} from 'react';

export default class ContactUs extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="indside_banner contact_us_br">
          <h2>CONTACT US</h2>
        </div>


        <div className="main_content">

          <div className="contact_form">
            <div className="form_left">
              <h6>Contact Us</h6>
              <div className="info">
                <p>mail:aaa@gmail.com</p>
                <p>333桃園市龜山區大坑路二段550號</p>
                <p>No.550, Sec. 2, Dakeng Rd., Guishan Township, Taoyuan County 333, Taiwan (R.O.C.)</p>
              </div>

              <div className="i-form">
                <h4>Email </h4><input type="text"/>
              </div>

              <div className="i-form">
                <h4>Subject </h4><input type="text"/>
              </div>

              <div className="i-form">
                <h4>Message </h4><textarea name="" id=""></textarea>
              </div>


              <div className="sumit">Submit</div>
            </div>


            <div className="form_map">

              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1935.790306516525!2d121.33093203153274!3d25.054444001216968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a0be0e7ab43f%3A0x3927d289b949a01e!2z5L2z6Zu75LyB5qWt6IKh5Lu95pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1527833163807"
                  frameBorder="0" style={{border: '0'}} allowFullScreen/>
              </div>
            </div>


          </div>


        </div>
      </React.Fragment>
    );
  }
}
