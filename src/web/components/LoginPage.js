import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col} from 'react-bootstrap';
import '../styles/UnAuthPage.css';
import '../styles/flexboxgrid.css';
import '../styles/LoginPage.css';


export default class Index extends Component {

  render () {
    return (
      <div>
        <div className='row center-xs middle-xs'>
          <div className='col-xs-10'>
            <div className='UnAuth__Container'>
              <div className='row center-xs middle-xs'>
                <div className='col-xs-10'>
                  <h1>Visit Tracker</h1>
                </div>
              </div>
              <div className='row center-xs middle-xs'>
                <div className='col-xs-10'>
                  <label htmlFor='username'>Username </label>
                  <input id='username' type='text' />
                </div>
              </div>
              <div className='row center-xs middle-xs'>
                <div className='col-xs-10'>
                  <label htmlFor='password'>Password </label>
                  <input id='password' type='password' />
                </div>
              </div>
              <div className='row center-xs middle-xs'>
                <div className='col-xs-10'>
                  <button className='Button' type='button'>Submit</button>
                  <button className='Button' type='button'>Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
