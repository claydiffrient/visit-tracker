import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col} from 'react-bootstrap';
import '../styles/UnAuthPage.css';
import '../styles/flexboxgrid.css';

const STYLES = {};

export default class Index extends Component {

  constructor () {
    super();
    console.log(this.props);
  }

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
              <div className='row center-xs middle-xs around-xs'>
                <div className='col-xs-8'>
                  <a
                    href="/auth/login"
                    className='UnAuth__Container-Button'
                  >
                    I have an account, let me log in.
                  </a>
                </div>
              </div>
              <div className='row center-xs middle-xs around-xs'>
                <div className='col-xs-8'>
                  <a
                    href="/auth/signup"
                    className='UnAuth__Container-Button'
                  >
                    I don't have an account, let me signup.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
