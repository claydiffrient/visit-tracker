import { connect } from 'react-redux';
import * as Actions from '../actions';
import page from 'page';

import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col} from 'react-bootstrap';
import '../styles/UnAuthPage.css';
import '../styles/flexboxgrid.css';
import '../styles/LoginPage.css';

function mapStateToProps (state) {
  return {
    user: state.get('user')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleLogin (request) { return dispatch(Actions.loginUser(request)); }
  };
}

class LoginContainer extends Component {

  componentWillReceiveProps (nextProps) {
    if ((!this.props.user) && (nextProps.user)) {
      page('/');
    }
  }

  render () {
    return (
      <div>
        <div className='row center-xs middle-xs'>
          <div className='col-xs-10'>
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {...this.props});
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
