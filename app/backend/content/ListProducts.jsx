import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from './listProductsReducer';

@connect(state => ({
  listproducts: state.backend.productlist.list
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListProducts extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }

  render() {
    return (
      <div className="backend_wrapper">

      </div>
    );
  }
}
