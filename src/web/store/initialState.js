import { List, Map } from 'immutable';

const initialState = Map({
  persons: List([]),
  modal: Map({
    showing: false,
    userId: ''
  }),
  user: false
});

export default initialState;
