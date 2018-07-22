import React, {Component} from 'react';
import Header from "../../backend/header/Header";
import Footer from "../footer/Footer";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
