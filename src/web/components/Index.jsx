import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import { List } from 'immutable';
import PeopleList from './PeopleList';

export default class Index extends Component {

  static propTypes = {
    persons: React.PropTypes.instanceOf(List)
  };

  constructor () {
    super();
    console.log(this.props);
  }

  render () {
    return (
      <div>
        <Row className='text-center'>
          <Col sm={12}>
            <ButtonGroup>
              <Button>Not Visited</Button>
              <Button>12 Months</Button>
              <Button>6 Months</Button>
              <Button>3 Months</Button>
              <Button>1 Month</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <PeopleList {...this.props} />
      </div>
    );
  }
}
