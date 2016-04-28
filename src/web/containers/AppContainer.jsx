import { connect } from 'react-redux';
import * as Actions from '../actions';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col } from 'react-bootstrap';
import { Nav, NavItem, NavDropdown, Navbar, MenuItem } from 'react-bootstrap';
import page from 'page';

function mapStateToProps (state) {
  return {
    persons: state.get('persons'),
    modal: state.get('modal'),
    user: state.get('user'),
    filteredPersons: state.get('filteredPersons')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleWillMount () { return dispatch(Actions.getPersons()); },
    onAddPersonSubmit (request) { return dispatch(Actions.addPerson(request));},
    handleDeletePerson (id) { return dispatch(Actions.deletePerson(id));},
    openAddVisitModal (id) { return dispatch(Actions.openAddVisitModal(id));},
    closeAddVisitModal () { return dispatch(Actions.closeAddVisitModal());},
    handleAddVisit (visit) { return dispatch(Actions.addVisit(visit));},
    handleLogout () { return dispatch(Actions.logoutUser());},
    handleUpdatePassword (updateObj) { return dispatch(Actions.updatePassword(updateObj)); },
    handleFilter (filter) { return dispatch(Actions.setFilter({filter})); }
  };
}

class App extends Component {
  constructor () {
    super();
  }

  componentWillMount () {
    this.props.handleWillMount();
  }

  componentWillReceiveProps (nextProps) {
    if ((this.props.user) && (!nextProps.user)) {
      page('/');
    }
  }

  render () {

    const username = (this.props.user) ? this.props.user.get('username') : ''

    return (
      <Grid>
        <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Visit Tracker</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Last Visited</NavItem>
                <NavItem eventKey={2} href="#">Visits</NavItem>
                <NavItem eventKey={3} href="/people">People</NavItem>
              </Nav>
              <Nav pullRight>
                <NavDropdown eventKey={1} title={username}>
                  <NavItem eventKey={1.1} href="/settings">Settings</NavItem>
                  <NavItem eventKey={1.2} onClick={this.props.handleLogout}>Logout</NavItem>
                </NavDropdown>
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
