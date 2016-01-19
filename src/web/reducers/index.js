import * as Actions from '../actions';
import { handleActions } from 'redux-actions';
import initialState from '../store/initialState';
import { fromJS } from 'immutable';

const ROOT_REDUCER = handleActions({
  [Actions.GOT_PERSONS]: (state = initialState, action) => {
    const oldPersons = state.get('persons');
    const newPersons = oldPersons.concat(fromJS(action.payload));
    return state.set('persons', newPersons);
  }
});

export default ROOT_REDUCER;
