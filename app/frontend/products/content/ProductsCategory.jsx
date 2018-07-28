import React, {Component} from 'react';
import {Link} from 'react-router';

export default class ProductsCategory extends Component {
  render() {
    const {products} = this.props;
    return (
      <React.Fragment>
        <div className="content">
          {products && products.map(p =>
            <div className="product_block">
              <div className="product_photo">
                <img src={`/upload/${p.image_url}`} alt=""/>
              </div>
              <div className="product_info">
                <Link to={`/products/details/${p.id}`}>
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
      </React.Fragment>
    );
  }
}
