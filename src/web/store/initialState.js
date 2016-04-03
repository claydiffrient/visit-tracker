import { List, Map } from 'immutable';
import { getUserState } from '../utils';


const initialState = Map({
  persons: List([]),
  modal: Map({
    showing: false,
    userId: ''
  }),
  user: getUserState()
});

export default initialState;
