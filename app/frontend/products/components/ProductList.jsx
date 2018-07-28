import React, {Component} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

const categories = ['DESKTOP', 'WALLPLUG', 'USBCHARGER', 'WIRELESS'];

export default class ProductList extends Component {
  render() {
    const {category, products} = this.props;
    return (
      <React.Fragment>
        {categories.map(c =>
          <div className="product_menu">
            <div className="product_title">{c} <i className={classnames({fas: true, 'fa-angle-down': c === category, 'fa-angle-left': c !== category})} /></div>
            <div className={classnames({product_list: true, display_down: c === category})}>
              <ul>
                {products && products.map(p =>
                  <li>
                    <Link to={`/products/details/${p.id}`}>{p.product_name}</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
