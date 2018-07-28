import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from './productsReducer';
import ProductList from "./components/ProductList";

@connect(state => ({
  products: state.frontend.products.products,
  product: state.frontend.products.product
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ProductsDetails extends Component {
  componentWillMount() {
    const {params, queryProducts, queryProduct, setCategory} = this.props;
    if (params.category) {
      setCategory(params.category);
    }
    queryProducts();
    queryProduct(params.id);
  }

  render() {
    const {products, params, product} = this.props;
    if (!products) {
      return false;
    }
    return (
      <React.Fragment>
        <div className="indside_banner product_br">
          <h2>PRODUCT</h2>
        </div>

        <div className="main_content">
          <div className="aside">
            <ProductList category={params.category} products={products} />
          </div>
          <div className="content">
            <div className="product_detail">
              <div className="product_wrapper">
                <div className="product_photo">
                  <img src={`/upload/${product.image_url}`} alt=""/>
                </div>
                <div className="product_info">
                  <h6>{product.product_name}</h6>
                  <div dangerouslySetInnerHTML={{__html: product.product_desc}} />
                  <div className="spec">
                    <div dangerouslySetInnerHTML={{__html: product.product_spec}} />
                  </div>
                  <a href={`/upload/${product.pdf_url}`} className="pdf_download" download>
                    <img src={require('../../assets/img/pdf.png')} alt=""/>
                  </a>
                </div>
              </div>
              <div className="specification">
                <h6>Feature</h6>
                <div dangerouslySetInnerHTML={{__html: product.feature}} />
                <h6>Contact Person:</h6>
                <p>e-mail: carsonhuang@gec-powersupply.com</p>
                <p>e-mail: gechuang@ms3.hinet.net</p>

                <h6>Main Export Market</h6>
                <p>Asia ,Australia ,Europe ,New Zealand ,United States of America</p>
                <p>Main Export Market</p>
              </div>
              <Link to="/contactus" className="contact_us">Contact Us</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
