import React, {Component} from 'react';
import {Link} from "react-router";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {openSearchModal} from './searchModalReducer';
import SearchModal from './SearchModal';
import $ from 'jquery';

@connect(state => ({

}), dispatch => bindActionCreators({openSearchModal}, dispatch))
export default class Header extends Component {
  componentDidMount() {
    let aside = this.aside;
    $(this.hamburg).click(function(){
      $(aside).delay(200).toggleClass("hamburg-open");
      $(this).delay(200).toggleClass("cross");
    });
  }

  render() {
    const {openSearchModal} = this.props;
    return (
      <React.Fragment>
        <div className="header_wrapper">
          <header>
            <div className="logo"><img src={require('../../assets/img/logo.png')} alt=""/></div>
            <div className="deskmenu">
              <ul>
                <li>
                  <Link to="/">HOME</Link>
                  <div className="b_line"></div>
                </li>

                <li>
                  <Link to="/products">PRODUCTS</Link>
                  <div className="b_line"></div>
                  <ul className="dropdown ">
                    <li><Link to="/products/DESKTOP">DESK TOP</Link></li>
                    <li><Link to="/products/WALLPLUG">WALL PLUG</Link></li>
                    <li><Link to="/products/USBCHARGER">USB CHARGER</Link></li>
                    <li><Link to="/products/WIRELESS">WIRELESS </Link></li>
                  </ul>

                </li>
                <li><Link to="/aboutus">ABOUT US</Link>
                  <div className="b_line"></div>
                </li>
                <li><Link to="/contactus">CONTACT US</Link>
                  <div className="b_line"></div>
                </li>

                <li><a href="javascript:;" className="search_site trigger-custom" data-iziModal-open="#modal-search-site" onClick={openSearchModal}>
                  <i className="fas fa-search"/></a></li>
              </ul>
            </div>
            <div className="hamburg" ref={n => this.hamburg = n}>
              <span className="aaa"></span>
              <span className="bbb"></span>
              <span className="ccc"></span>
            </div>
            <div className="aside" ref={r => this.aside = r}>
              <ul>
                <li><Link to="/" className="m-first">HOME</Link></li>
                <li><Link to="/products" className="m-first">PRODUCTS</Link></li>
                <li><Link to="/aboutus" className="m-first">ABOUT US</Link></li>
                <li><Link to="/contactus" className="m-first">CONTACT US</Link></li>
                <li><a href="" className="m-first"><i className="fas fa-search"></i></a></li>
                <li><a href="" className="m-first"><i className="far fa-envelope"></i></a></li>
              </ul>

            </div>
          </header>
        </div>
        <SearchModal/>
      </React.Fragment>
    );
  }
}
