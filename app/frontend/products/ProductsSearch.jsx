import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(state => ({
  products: state.frontend.search.products
}), dispatch => bindActionCreators({}, dispatch))
export default class ProductsSearch extends Component {
  render() {
    const {products} = this.props;
    return (
      <React.Fragment>
        <div className="indside_banner product_br">
          <h2>PRODUCT</h2>
        </div>
        <div className="main_content">
          <div className="search_result">
            {products && products.rows.map(p =>
              <div className="product_block">
                <div className="product_photo">
                  <img src={`/upload/${p.image_url}`} alt=""/>
                </div>
                <div className="product_info">
                  <Link to={`/products/${p.product_category}/details/${p.id}`}>
                    <h6>{p.product_name}</h6>
                  </Link>
                  <div dangerouslySetInnerHTML={{__html: p.product_desc}} />
                  <div className="spec">
                    <div dangerouslySetInnerHTML={{__html: p.product_spec}} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
