import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import { List } from 'immutable';
import PeopleList from './PeopleList';

export default class Index extends Component {

  static propTypes = {
    filteredPersons: React.PropTypes.instanceOf(List)
  };

  constructor () {
    super();
    console.log(this.props);

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter (filter) {
    this.props.handleFilter(filter);
  }

  render () {
    return (
      <div>
        <Row className='text-center'>
          <Col sm={12}>
            <p>
              Use this screen to see who has been visited within each of the
              displayed time periods. By default all people are listed. Clicking a filter button will narrow the list
              to that time period.  Clicking the same filter will remove all filters.
            </p>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col sm={12}>
            <ButtonGroup>
              <Button onClick={this.handleFilter.bind(null, 'never')}>Not Visited</Button>
              <Button onClick={this.handleFilter.bind(null, '12m')}>12 Months</Button>
              <Button onClick={this.handleFilter.bind(null, '6m')}>6 Months</Button>
              <Button onClick={this.handleFilter.bind(null, '3m')}>3 Months</Button>
              <Button onClick={this.handleFilter.bind(null, '1m')}>1 Month</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <PeopleList {...this.props} />
      </div>
    );
  }
}
