import React, {Component} from 'react';

export default class IndexPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="indside_banner index_br">
          <h2>ASPIRE TO CAPTURE <br/>
            THE ESSENCE OF THE MOMEN</h2>
        </div>


        <div className="inex_des">

          <h5>THE FIRST TIME IT'S A VACATION AFTER <br/>
            THAT IT'S COMIMG HOME</h5>

          <p>GREATRON Electronics Co., Ltd. is a professional manufacturer for power supplies.Since 1998, we have been
            specialized in AC/DC Switching Adapter, Medical Adapter, DC/DC Converter, Battery Charger, Open Frame, and
            LED Drivers.</p>
          <p>Our strong team with 900 employees in Taiwan and China support our global customers the excellent service
            not only for our standard product, but also for OEM/ODM, and joint development.</p>
          <div className="g_line"></div>
        </div>

        <div className="product_info">

          <div className="product_intro">
            <div className="new">NEW</div>
            <img src="../../assets/img/product_01.png" alt=""/>
            <h6>12W C8 Desk Top Power Adapter</h6>
            <p>12W C8 Desk Top Power Adapter</p>
            <a href="" className="p-more">More</a>
          </div>

          <div className="product_intro">
            <img src="../../assets/img/product_02.png" alt=""/>
            <h6>12W C8 Desk Top Power Adapter</h6>
            <p>12W C8 Desk Top Power Adapter</p>
            <a href="" className="p-more">More</a>
          </div>

          <div className="product_intro">
            <div className="new">NEW</div>
            <img src="../../assets/img/product_01.png" alt=""/>
            <h6>12W C8 Desk Top Power Adapter</h6>
            <p>12W C8 Desk Top Power Adapter</p>
            <a href="" className="p-more">More</a>
          </div>

          <div className="product_intro">
            <img src="../../assets/img/product_02.png" alt=""/>
            <h6>12W C8 Desk Top Power Adapter</h6>
            <p>12W C8 Desk Top Power Adapter</p>
            <a href="" className="p-more">More</a>
          </div>

        </div>
      </React.Fragment>
    );
  }
}
