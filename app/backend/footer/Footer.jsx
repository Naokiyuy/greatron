import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    const {location} = this.props;

    if(location.pathname === '/backend/login') {
      return false;
    }
    return (
      <div className="footer_wrapper">
        <footer>
          <div className="copyright">
            <p>Copyright © 2017 Greatron Enterprise Co., Ltd All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
}
