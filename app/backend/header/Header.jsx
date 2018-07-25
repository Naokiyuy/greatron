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
                <Link to="/backend/index">HOME PRODUCTS</Link>
                <div className="b_line"></div>
              </li>
              <li>
                <Link to="/backend/list-products">PRODUCTS LIST</Link>
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
              <li><a href="" className="m-first">HOME</a></li>
              <li><a href="" className="m-first">PRODUCTS</a></li>
              <li><a href="" className="m-first">ABOUT US</a></li>
              <li><a href="" className="m-first">CONTACT US</a></li>
            </ul>

          </div>
        </header>
      </div>
    );
  }
}
