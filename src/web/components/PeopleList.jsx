import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap';

export default class PeopleList extends Component {
  constructor () {
    super();
    console.log(this.props);
  }

  render () {
    return (
      <div>
        <Row>
          {this.props.persons.map((person) => {
            return <div>{person}</div>;
          })}
        </Row>
      </div>
    );
  }
}
