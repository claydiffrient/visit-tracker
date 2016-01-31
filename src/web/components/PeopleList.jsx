import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'react-bootstrap';

export default class PeopleList extends Component {
  constructor () {
    super();
    console.log(this.props);
  }

  render () {
    return (
      <div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Address</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
          {this.props.persons.map((person) => {
            return (
              <tr key={person.get('id')}>
                <td>{person.get('name')}</td>
                <td>{person.get('address')}</td>
                <td>{person.get('status')}</td>
              </tr>
            );
          })}
          </tbody>
        </Table>
      </div>
    );
  }
}
