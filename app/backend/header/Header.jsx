import React, {Component} from 'react';
import {Link} from "react-router";

export default class Header extends Component {
  render() {
    return (
      <div className="header_wrapper">
        <header>
          <div className="logo"><img src={require('../../assets/img/logo.png')} alt=""/></div>
          <div className="deskmenu">
            <ul>
              <li>
                <Link to="/backend">HOME</Link>
                <div className="b_line"></div>
              </li>

              <li>
                <Link to="/backend/products">PRODUCTS</Link>
                <div className="b_line"></div>
                <ul className="dropdown ">
                  <li><a href="#">DESK TOP</a></li>
                  <li><a href="#">WALL PLUG</a></li>
                  <li><a href="#">USB CHARGER</a></li>
                  <li><a href="#">WIRELESS </a></li>
                </ul>

              </li>
              <li><Link to="/aboutus">ABOUT US</Link>
                <div className="b_line"></div>
              </li>
              <li><Link to="/contactus">CONTACT US</Link>
                <div className="b_line"></div>
              </li>

              <li><a href="" className="search_site trigger-custom" data-iziModal-open="#modal-search-site">
                <i className="fas fa-search"/></a></li>
              <li><a href=""><i className="far fa-envelope"/></a></li>
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
              <li><a href="" className="m-first"><i className="fas fa-search"></i></a></li>
              <li><a href="" className="m-first"><i className="far fa-envelope"></i></a></li>
            </ul>

          </div>
        </header>
      </div>
    );
  }
}
