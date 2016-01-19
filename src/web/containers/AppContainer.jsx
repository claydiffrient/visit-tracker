import { connect } from 'react-redux';
import * as Actions from '../actions';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';

function mapStateToProps (state) {
  return {
    persons: state.get('persons')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleWillMount: () => {
      dispatch(Actions.getPersons());
    }
  };
}

class App extends Component {
  constructor () {
    super();
  }

  componentWillMount () {
    this.props.handleWillMount();
  }

  render () {
    return (
      <Grid>
        <Row className='text-center'>
          <Col sm={12}>
            App Header Goes Here
          </Col>
        </Row>
        {React.cloneElement(this.props.children, {...this.props})}
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
