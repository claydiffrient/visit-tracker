import { List, Map } from 'immutable';
import { getUserState } from '../utils';


const initialState = Map({
  persons: List([]),
  filteredPersons: List([]),
  modal: Map({
    showing: false,
    userId: ''
  }),
  user: getUserState(),
  filter: 'all',
  visits: List([])
});

export default initialState;
