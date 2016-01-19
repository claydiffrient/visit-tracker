import { createAction } from 'redux-actions';
import axios from 'axios';
import config from 'config';

export const GOT_PERSONS = 'GOT_PERSONS';
export const gotPersons = createAction(GOT_PERSONS);

export const getPersons = (ajaxLib = axios) => {
  console.log('here');
  return (dispatch, getState) => {
    // TODO: Make this configurable
    ajaxLib.get('http://visitapi.docker/persons')
           .then((response) => {
             console.log('here2');
             dispatch(gotPersons(response.data));
           });
  };
};
