import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';

export default class Pagination extends Component {
  render() {
    const {grid, clickCallback} = this.props;
    return (
      <ReactPaginate
        forceSelected={grid.page - 1}
        previousLabel={<i className="fa fa-angle-left"/>}
        nextLabel={<i className="fa fa-angle-right"/>}
        breakLabel={<a href="javascript:;">...</a>}
        pageCount={grid.pages}
        marginPageDisplayed={2}
        pageRangeDisplayed={5}
        clickCallback={clickCallback}
        containerClassName={"pages"}
        activeClassName={"active"}
      />
    );
  }
}
