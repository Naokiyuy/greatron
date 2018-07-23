import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as actionCreators from './longinReducer';

@reduxForm({
  form: 'loginform',
  fields: ['email', 'password']
}, state => ({}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class Login extends Component {
  render() {
    const {handleSubmit, login, fields: {email, password}} = this.props;
    return (
      <div className="login_wrapper">
        <form onSubmit={handleSubmit(login)}>
          <div className="login">
            <img src={require('../../assets/img/logo.png')} alt=""/>
            <div className="input_row">
              <input type="text" className="login_input" placeholder="Email" {...email}/>
            </div>
            <div className="input_row">
              <input type="password" className="login_input" placeholder="Password" {...password}/>
            </div>
            <button type="submit" className="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
