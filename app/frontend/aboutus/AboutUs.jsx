import React, {Component} from 'react';

export default class AboutUs extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="indside_banner about_us_br">
          <h2>ABOUT US</h2>
        </div>


        <div className="main_content ">
          <div className="aside">
            <div className="about_menu">
              <ul>
                <li><a href="">Basic Information</a></li>
                <li><a href="">Company Overview</a></li>
              </ul>
            </div>


          </div>

          <div className="content">
            <div className="about_content">
              <section>
                <img src={require('../../assets/img/location.png')} alt=""/>
                  <h6>Basic Information</h6>

                  <p>Company Name:GREATRON ENTERPRISE CO., LTD.</p>
                  <p>Business Type:Exporter,Manufacturer,OEM,ODM</p>
                  <p>Year Established:1994</p>
                  <p>Capital: TWD 1,000,001 - 5,000,000</p>
                  <p>Tel (1):+886-3-3555318</p>
                  <p>Zip Code:333</p>
                  <p>Address:No.550, Sec. 2, Dakeng Rd., Guishan Township, Taoyuan County 333, Taiwan (R.O.C.)</p>
                  <p>No. of Employees: > 1,000</p>
                  <p>Brand:GEC</p>
                  <p>Main Product:power adapter, adaptor, AC/DC adapter, switching power supply, AC-DC adapter, adapter,
                    power supply, external power adapter, switching power adapter</p>
                  <p>Main Export Market:Asia,Europe,United States of America,Mexico,Australia,New Zealand,Canada</p>
              </section>

              <section>

                <img src={require('../../assets/img/location.png')} alt=""/>

                  <h6>Basic Information</h6>

                  <p>Company Name:GREATRON ENTERPRISE CO., LTD.</p>
                  <p>Business Type:Exporter,Manufacturer,OEM,ODM</p>
                  <p>Year Established:1994</p>
                  <p>Capital: TWD 1,000,001 - 5,000,000</p>
                  <p>Tel (1):+886-3-3555318</p>
                  <p>Zip Code:333</p>
                  <p>Address:No.550, Sec. 2, Dakeng Rd., Guishan Township, Taoyuan County 333, Taiwan (R.O.C.)</p>
                  <p>No. of Employees: > 1,000</p>
                  <p>Brand:GEC</p>
                  <p>Main Product:power adapter, adaptor, AC/DC adapter, switching power supply, AC-DC adapter, adapter,
                    power supply, external power adapter, switching power adapter</p>
                  <p>Main Export Market:Asia,Europe,United States of America,Mexico,Australia,New Zealand,Canada</p>
              </section>

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
