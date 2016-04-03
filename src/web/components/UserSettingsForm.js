import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import Icon from 'react-fa';
import AddVisitModal from './AddVisitModal';

export default class UserSettingsForm extends Component {
  static propTypes = {
    handleUpdatePassword: React.PropTypes.func.isRequired
  };

  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();

    if (this.refs.newPass.value !== this.refs.confirmPass.value) {
      // TODO: Handle alerting the user to the problem here.
      return false;
    }
    if (!this.refs.oldPass.value) {
      // TODO: Handle alerting the user to the problem here.
      return false;
    }
    if (!this.refs.newPass.value) {
      // TODO: Handle alerting the user to the problem here.
      return false;
    }
    const passwordUpdate = {
      old: this.refs.oldPass.value,
      new: this.refs.newPass.value
    };
    this.props.handleUpdatePassword(passwordUpdate);
  }

  render () {
    return (
      <div>
        <h2>Settings</h2>
        <h3>Update Password</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='row center-xs middle-xs'>
            <div className='col-xs-10'>
              <label htmlFor="oldPassword">Old Password:</label>
              <input ref="oldPass" type="password" id="oldPassword" />
            </div>
          </div>
          <div className='row center-xs middle-xs'>
            <div className='col-xs-10'>
              <label htmlFor="newPassword">New Password:</label>
              <input ref="newPass" type="password" id="newPassword" />
            </div>
          </div>
          <div className='row center-xs middle-xs'>
            <div className='col-xs-10'>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input ref="confirmPass" type="password" id="confirmPassword" />
            </div>
          </div>
          <div className='row center-xs middle-xs'>
            <div className='col-xs-10'>
              <button className="Button" type="submit">Update Password</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
