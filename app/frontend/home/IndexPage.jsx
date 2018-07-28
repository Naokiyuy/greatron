import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from './indexPageReducer';

@connect(state => ({
  products: state.frontend.indexproducts.products
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class IndexPage extends Component {
  componentWillMount() {
    const {queryIndexProducts} = this.props;
    queryIndexProducts();
  }

  render() {
    const {products} = this.props;
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
          {products && products.map(p =>
            <div className="product_intro">
              {p.is_new && <div className="new">NEW</div>}
              <img src={`/upload/${p.image_url}`} alt=""/>
              <h6>{p.product_name}</h6>
              <p>{p.sub_title}</p>
              <Link to={`/products/${p.product_category}/details/${p.id}`} className="p-more">More</Link>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
