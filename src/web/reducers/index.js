import * as Actions from '../actions';
import { handleActions } from 'redux-actions';
import initialState from '../store/initialState';
import { fromJS } from 'immutable';
import { getUserState, deleteToken } from '../utils';
import page from 'page';

const ROOT_REDUCER = handleActions({
  [Actions.GOT_PERSONS]: (state = initialState, action) => {
    const oldPersons = state.get('persons');
    const newPersons = oldPersons.concat(fromJS(action.payload));
    return state.set('persons', newPersons);
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
  }
});

export default ROOT_REDUCER;
