import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Row, Col, Button, Input } from 'react-bootstrap';

export default class AddPersonForm extends Component {

  static propTypes = {
    onAddPersonSubmit: React.PropTypes.func
  };

  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();

    const requestBody = {
      name: this.refs.name.getValue(),
      address: this.refs.name.getValue(),
      status: this.refs.status.getValue()
    }

    this.props.onAddPersonSubmit(requestBody);

  }

  render () {
    return (
      <div>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            ref="name"
          />
          <Input
            type="text"
            placeholder="Address"
            ref="address"
          />
          <Input
            type="text"
            placeholder="Status"
            ref="status"
          />
          <Button type="submit" bsStyle="primary">Add Person</Button>
        </form>
      </div>
    );
  }
}
