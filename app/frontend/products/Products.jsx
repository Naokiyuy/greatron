import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from './productsReducer';
import ProductList from "./components/ProductList"
import Pagination from "./components/Pagination";

@connect(state => ({
  products: state.frontend.products.products,
  grid: state.frontend.products.grid
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
    const {products, params, grid, page} = this.props;
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
                  <div dangerouslySetInnerHTML={{__html: p.product_desc}} />

                  <div className="spec">
                    <div dangerouslySetInnerHTML={{__html: p.product_spec}} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <Pagination grid={grid} clickCallback={page}/>
        </div>
      </React.Fragment>
    );
  }
}
