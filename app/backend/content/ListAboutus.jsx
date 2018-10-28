import React, {Component} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from "redux";
import * as actionCreators from "./listAboutusReducer";
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'aboutusqueryform',
  fields: ['title']
}, state => ({
  listAboutus: state.backend.aboutuslist.list
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListAboutus extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }

  deleteAboutus = (id) => {
    const {list, deleteAboutus} = this.props;
    deleteAboutus(id).then(() => {
      list();
    });
  };

  searchAboutus = () => setTimeout(() => this.props.searchAboutus(this.props.values), 0);

  render() {
    const {handleSubmit, searchAboutus, listAboutus} = this.props;
    return (
      <div className="backend_wrapper">
        <Link to="/backend/add-aboutus" className="addproduct"><i className="fa fa-plus"/> Add Aboutus</Link>
        <div className="product-item">
          <form onSubmit={handleSubmit(searchAboutus)} onChange={this.searchAboutus}>
            <table>
              <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {listAboutus && listAboutus.map(c =>
                <tr>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>
                    <div className="btn">
                      <Link className="edit" to={`/backend/edit-aboutus/${c.id}`}>編輯</Link>
                      <div className="cancel" onClick={() => this.deleteAboutus(c.id)}>刪除</div>
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
}
