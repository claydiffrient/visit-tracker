import { createAction } from 'redux-actions';
import axios from 'axios';
// import config from 'config';

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

const API_BASE_URL = process.env.API_URL || 'http://visitapi.docker';

export const getPersons = (ajaxLib = axios) => {
  return (dispatch, getState) => {
    ajaxLib.get(`${API_BASE_URL}/persons`)
           .then((response) => {
             console.log('here2');
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
    ajaxLib.post(`${API_BASE_URL}/persons/${personId}/visit`)
           .then((response) => {
             dispatch(addedVisit(response.data));
           });
  }
};
