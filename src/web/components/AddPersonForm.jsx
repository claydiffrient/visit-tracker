import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Row, Col, Button, Input } from 'react-bootstrap';

export default class AddPersonForm extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <form className='form-inline'>
          <Input
            type="text"
            placeholder="Name"
            ref="input"
          />
          <Input
            type="text"
            placeholder="Address"
            ref="input"
          />
          <Input
            type="text"
            placeholder="Status"
            ref="input"
          />
          <Button bsStyle="primary">Add Person</Button>
        </form>
      </div>
    );
  }
}
