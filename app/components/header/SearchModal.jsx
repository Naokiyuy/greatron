import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import Modal from 'react-modal';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as actionCreators from './searchModalReducer';
import 'izimodal/css/iziModal.min.css'

@reduxForm({
  form: 'searchform',
  fields: ['search']
}, state => ({
  isOpen: state.frontend.search.isOpen
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class SearchModal extends Component {
  search = (values) => {
    const {searchProducts, closeSearchModal} = this.props;
    searchProducts(values).then(r => {
      browserHistory.push('/products/search/results');
      closeSearchModal();
    });
  };

  render() {
    const {isOpen, handleSubmit, closeSearchModal, fields: {search}} = this.props;
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (
      <Modal isOpen={isOpen}
             style={customStyles}
             shouldCloseOnOverlayClick={true}
             ariaHideApp={false}
             contentLabel="Search Modal">
        <form onSubmit={handleSubmit(this.search)}>
          <div id="modal-search-site" className="iziModal_search">
            <div className="simple-search">
              <div className="search_area">
                <input type="text" placeholder="請輸入查詢值" {...search}/>
                <button type="submit" className="submit">查詢</button>
                <button type="button" onClick={closeSearchModal}>關閉</button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}
