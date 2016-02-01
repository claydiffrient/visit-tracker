import { createAction } from 'redux-actions';
import axios from 'axios';
import config from 'config';

export const GOT_PERSONS = 'GOT_PERSONS';
export const gotPersons = createAction(GOT_PERSONS);

export const ADDED_PERSON = 'ADDED_PERSON';
export const addedPerson = createAction(ADDED_PERSON);

export const DELETED_PERSON = 'DELETED_PERSON';
export const deletedPerson = createAction(DELETED_PERSON);

const API_BASE_URL = 'http://visitapi.docker';

export const getPersons = (ajaxLib = axios) => {
  console.log('here');
  return (dispatch, getState) => {
    // TODO: Make this configurable
    ajaxLib.get(`${API_BASE_URL}/persons`)
           .then((response) => {
             console.log('here2');
             dispatch(gotPersons(response.data));
           });
  };
};

export const addPerson = (person, ajaxLib = axios) => {
  console.log(person);
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
