import React, {Component} from 'react';

export default class Pagination extends Component {
  render() {
    const {grid} = this.props;
    return (
      <div className="pages">
        <a href=""> <i className="fa fa-angle-left" aria-hidden="true"></i> </a>
        {

        }
        <a href="" className="mainblue">1</a>
        <a href="">2</a>
        <a href="">3</a>
        <a href="">4</a>
        <a href="">5</a>
        <a href="">6</a>
        <a href=""> <i className="fa fa-angle-right" aria-hidden="true"></i> </a>
      </div>
    );
  }
}
