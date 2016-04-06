import { createAction } from 'redux-actions';
import axiosLib from 'axios';
import _ from 'lodash';

import { configureAxios, deleteToken } from '../utils';

const axios = configureAxios(axiosLib)

export const GOT_PERSONS = 'GOT_PERSONS';
export const gotPersons = createAction(GOT_PERSONS);

export const ADDED_PERSON = 'ADDED_PERSON';
export const addedPerson = createAction(ADDED_PERSON);

export const DELETED_PERSON = 'DELETED_PERSON';
export const deletedPerson = createAction(DELETED_PERSON);

export const OPEN_ADD_VISIT_MODAL = 'OPEN_ADD_VISIT_MODAL';
export const openAddVisitModal = createAction(OPEN_ADD_VISIT_MODAL);

export const CLOSE_ADD_VISIT_MODAL = 'CLOSE_ADD_VISIT_MODAL';
export const closeAddVisitModal = createAction(CLOSE_ADD_VISIT_MODAL);

export const ADDED_VISIT = 'ADDED_VISIT';
export const addedVisit = createAction(ADDED_VISIT);

export const LOGGED_IN_USER = 'LOGGED_IN_USER';
export const loggedInUser = createAction(LOGGED_IN_USER);

export const LOGGED_OUT_USER = 'LOGGED_OUT_USER';
export const loggedOutUser = createAction(LOGGED_OUT_USER);

export const UPDATED_PASSWORD = 'UPDATED_PASSWORD';
export const updatedPassword = createAction(UPDATED_PASSWORD);

const API_BASE_URL = API_URL || 'http://visitapi.docker';

export const getPersons = (ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.get(`${API_BASE_URL}/persons`)
           .then((response) => {
             dispatch(gotPersons(response.data));
           });
  };
};

export const addPerson = (person, ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.post(`${API_BASE_URL}/persons`, person)
           .then((response) => {
             dispatch(addedPerson(response.data));
           });
  };
};

export const deletePerson = (personId, ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.delete(`${API_BASE_URL}/persons/${personId}`)
           .then((response) => {
             dispatch(deletedPerson(response.data));
           });
  };
};

export const addVisit = ({personId, date, notes}, ajaxLib = axios) => {
  return (dispatch, getState) => {
    const request = {
      note_entered_by: getState().get('user').get('id'),
      date_visited: date,
      person: personId,
      notes
    };
    ajaxLib.post(`${API_BASE_URL}/persons/${personId}/visit`, request)
           .then((response) => {
             dispatch(addedVisit(response.data));
           });
  }
};

export const loginUser = (request, ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.post(`${API_BASE_URL}/auth/login`, request)
           .then((response) => {
             dispatch(loggedInUser(response.data));
           });
  };
}

export const logoutUser = () => {
  return (dispatch, getState) => {
    deleteToken();
    dispatch(loggedOutUser());
  };
}

export const updatePassword = (updatePassObj, ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.put(`${API_BASE_URL}/auth/password`, updatePassObj)
           .then((response) => {
             dispatch(updatedPassword())
           })
  };
}
