import * as Actions from '../actions';
import { handleActions } from 'redux-actions';
import initialState from '../store/initialState';
import { fromJS } from 'immutable';
import { getUserState, filterPeopleByLastVisit, deleteToken } from '../utils';
import page from 'page';

const ROOT_REDUCER = handleActions({
  [Actions.GOT_PERSONS]: (state = initialState, action) => {
    const oldPersons = state.get('persons');
    const newPersons = oldPersons.concat(fromJS(action.payload));
    const newState = state.set('persons', newPersons);
    return newState.set('filteredPersons', newPersons);
  },

  [Actions.GOT_VISITS]: (state = initialState, action) => {
    const oldVisits = state.get('visits');
    const newVisits = oldVisits.concat(fromJS(action.payload));
    return state.set('visits', newVisits);
  },

  [Actions.ADDED_PERSON]: (state = initialState, action) => {
    const oldPersons = state.get('persons');
    const newPersons = oldPersons.push(fromJS(action.payload));
    return state.set('persons', newPersons);
  },

  [Actions.DELETED_PERSON]: (state = initialState, action) => {
    const oldPersons = state.get('persons');
    const newPersons = oldPersons.filterNot(
      (x) => x.get('_id') === action.payload.person._id
    );
    return state.set('persons', newPersons);
  },

  [Actions.OPEN_ADD_VISIT_MODAL]: (state = initialState, action) => {
    return state.set('modal', fromJS({
      showing: true,
      userId: action.payload
    }));
  },

  [Actions.CLOSE_ADD_VISIT_MODAL]: (state = initialState, action) => {
    return state.set('modal', fromJS({
      showing: false,
      userId: ''
    }));
  },

  [Actions.ADDED_VISIT]: (state = initialState, action) => {
    return state.set('modal', fromJS({
      showing: false,
      userId: ''
    }));
  },

  [Actions.LOGGED_IN_USER]: (state = initialState, action) => {
    return state.set('user', getUserState());
  },

  [Actions.LOGGED_OUT_USER]: (state = initialState, action) => {
    return state.set('user', null);
  },

  [Actions.SET_FILTER]: (state = initialState, action) => {
    let filtered = [];
    if (state.get('filter') === action.payload.filter) {
      action.payload.filter = 'all';
    }
    const newState = state.set('filter', action.payload.filter);
    switch (action.payload.filter) {
      case 'all':
        return newState.set('filteredPersons', state.get('persons'));
        break;
      case 'never':
        filtered = newState.get('persons').filter((p) => {
          return p.get('lastVisit') == null;
        });
        return newState.set('filteredPersons', filtered);
        break;
      case '12m':
        return filterPeopleByLastVisit(newState, 12);
        break;
      case '6m':
        return filterPeopleByLastVisit(newState, 6, 7);
        break;
      case '3m':
        return filterPeopleByLastVisit(newState, 3, 4);
        break;
      case '1m':
        return filterPeopleByLastVisit(newState, 1, 2);
        break;
      default:
        return newState;
    }
  }
});

export default ROOT_REDUCER;
