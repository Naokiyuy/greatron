import React, {Component} from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

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
