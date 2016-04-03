import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col} from 'react-bootstrap';
import '../styles/UnAuthPage.css';
import '../styles/flexboxgrid.css';
import '../styles/LoginPage.css';

export default class Index extends Component {

  constructor () {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  clearForm () {
    this.setState({
      username: '',
      password: ''
    });
  }

  submitForm () {
    this.props.handleLogin(this.state);
  }

  handleUsernameChange (e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange (e) {
    this.setState({
      password: e.target.value
    });
  }

  render () {
    return (
      <div className='UnAuth__Container'>
        <div className='row center-xs middle-xs'>
          <div className='col-xs-10'>
            <h1>Visit Tracker</h1>
          </div>
        </div>
        <div className='row center-xs middle-xs'>
          <div className='col-xs-10'>
            <label htmlFor='username'>Username </label>
            <input
              ref='username'
              id='username'
              type='text'
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
        </div>
        <div className='row center-xs middle-xs'>
          <div className='col-xs-10'>
            <label htmlFor='password'>Password </label>
            <input
              ref='password'
              id='password'
              type='password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
        </div>
        <div className='row center-xs middle-xs'>
          <div className='col-xs-10'>
            <button
              className='Button'
              type='button'
              onClick={this.submitForm}
            >Submit
            </button>
            <button
              className='Button'
              type='button'
              onClick={this.clearForm}
            >Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}
