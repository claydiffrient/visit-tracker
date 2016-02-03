import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import Icon from 'react-fa';
import AddVisitModal from './AddVisitModal';

export default class PeopleList extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Address</th>
              <th scope='col'>Status</th>
              <th scope='col'>Options</th>
            </tr>
          </thead>
          <tbody>
          {this.props.persons.map((person) => {
            return (
              <tr key={person.get('_id')}>
                <td>{person.get('name')}</td>
                <td>{person.get('address')}</td>
                <td>{person.get('status')}</td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.props.openAddVisitModal.bind(null, person.get('_id'))}>
                      <Icon name="sticky-note" /> Add Visit
                    </Button>
                    <Button bsStyle="danger" onClick={this.props.handleDeletePerson.bind(null, person.get('_id'))}>
                      <Icon name="trash" /> Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            );
          })}
          </tbody>
        </Table>
        <AddVisitModal {...this.props} />
      </div>
    );
  }
}
