import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from './productsReducer';
import ProductList from "./components/ProductList";

@connect(state => ({
  products: state.frontend.products.products
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class Products extends Component {
  componentWillMount() {
    const {params, queryProducts, setCategory} = this.props;
    if (params.category) {
      setCategory(params.category);
    }
    queryProducts();
  }

  render() {
    const {products, params} = this.props;
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
            {products && products.map(p =>
              <div className="product_block">
                <div className="product_photo">
                  <img src={`/upload/${p.image_url}`} alt=""/>
                </div>
                <div className="product_info">
                  <Link to={`/products/${p.product_category}/details/${p.id}`}>
                    <h6>{p.product_name}</h6>
                  </Link>
                  <p>{p.product_desc}</p>

                  <div className="spec">
                    <p>{p.product_spec}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pages">
            <a href=""> <i className="fa fa-angle-left" aria-hidden="true"></i> </a>
            <a href="" className="mainblue">1</a>
            <a href="">2</a>
            <a href="">3</a>
            <a href="">4</a>
            <a href="">5</a>
            <a href="">6</a>
            <a href=""> <i className="fa fa-angle-right" aria-hidden="true"></i> </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
