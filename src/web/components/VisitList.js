import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import Icon from 'react-fa';
import AddVisitModal from './AddVisitModal';
import moment from 'moment';

export default class PeopleList extends Component {
  constructor () {
    super();
  }

  componentWillMount () {
    this.props.handleVisitListWillMount();
  }

  render () {
    return (
      <div>
        <p>This page lists all the visits which have occurred.</p>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Date</th>
              <th scope='col'>Notes</th>
              <th scope='col'>Visitor</th>
            </tr>
          </thead>
          <tbody>
          {this.props.visits.map((visit) => {
            const date = moment(visit.get('date_visited')).calendar(null, {
              lastDay: '[Yesterday]',
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              lastWeek: '[Last] dddd',
              nextWeek: 'dddd',
              sameElse: 'L'
            });
            return (
              <tr key={visit.get('_id')}>
                <td>{visit.get('person').get('name')}</td>
                <td>{date}</td>
                <td>{visit.get('notes')}</td>
                <td>{visit.get('note_entered_by').get('username')}</td>
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
