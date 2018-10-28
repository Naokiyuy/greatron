import React, {Component} from 'react';
import {Link} from "react-router";

export default class Header extends Component {
  render() {
    const {location} = this.props;

    if(location.pathname === '/backend/login') {
      return false;
    }
    return (
      <div className="header_wrapper">
        <header>
          <div className="logo"><img src={require('../../assets/img/logo.png')} alt=""/></div>
          <p style={{color: '#FFF', marginLeft: '30px'}}>後台管理系統</p>
          <div className="deskmenu">
            <ul>
              <li>
                <Link to="/backend/list-products">PRODUCTS LIST</Link>
                <div className="b_line"></div>
              </li>
              <li>
                <Link to="/backend/list-categories">CATEGORIES LIST</Link>
                <div className="b_line"></div>
              </li>
              <li>
                <Link to="/backend/list-aboutus">ABOUT US</Link>
                <div className="b_line"></div>
              </li>
              <li>
                <Link to="/backend/list-news">NEWS LIST</Link>
                <div className="b_line"></div>
              </li>
            </ul>
          </div>
          <div className="hamburg">
            <span className="aaa"></span>
            <span className="bbb"></span>
            <span className="ccc"></span>
          </div>
          <div className="aside">
            <ul>
              <li><Link to="/backend" className="m-first">HOME</Link></li>
              <li><Link to="/backend/list-products" className="m-first">PRODUCTS LIST</Link></li>
              <li><Link to="/backend/list-categories" className="m-first">CATEGORIES</Link></li>
              <li><Link to="/backend/list-aboutus" className="m-first">ABOUT US</Link></li>
              <li><Link to="/backend/list-news" className="m-first">NEWS</Link></li>
            </ul>

          </div>
        </header>
      </div>
    );
  }
}
