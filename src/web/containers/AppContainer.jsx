import { connect } from 'react-redux';
import * as Actions from '../actions';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col } from 'react-bootstrap';
import { Nav, NavItem, NavDropdown, Navbar, MenuItem } from 'react-bootstrap';

function mapStateToProps (state) {
  return {
    persons: state.get('persons')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleWillMount () { return dispatch(Actions.getPersons()); },
    onAddPersonSubmit (request) { return dispatch(Actions.addPerson(request));},
    handleDeletePerson (id) { return dispatch(Actions.deletePerson(id));}
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
      <Grid fluid={true}>
        <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Visit Tracker</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Last Visited</NavItem>
                <NavItem eventKey={2} href="#">Visits</NavItem>
                <NavItem eventKey={3} href="/people">People</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        <Row>
          <Col style={{marginTop: '70px'}} xs={12}>
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, {...this.props});
            })}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
