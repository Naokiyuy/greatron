import React, {Component} from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header location={this.props.location}/>
        {this.props.children}
        <Footer location={this.props.location}/>
      </div>
    );
  }
}
