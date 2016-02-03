import { List, Map } from 'immutable';

const initialState = Map({
  persons: List([]),
  modal: Map({
    showing: false,
    userId: ''
  })
});

export default initialState;
