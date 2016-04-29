import { render } from 'react-dom';
import React from 'react';
import page from 'page';
import { Provider } from 'react-redux';
import initialState from './store/initialState';
import configureStore from './store/configureStore';

import AppContainer from './containers/AppContainer';
import LoginContainer from './containers/LoginContainer';

import Index from './components/Index';
import PeopleList from './components/PeopleList';
import VisitList from './components/VisitList';
import AddPersonForm from './components/AddPersonForm';
import LoginPage from './components/LoginPage';
import UserSettingsForm from './components/UserSettingsForm'

const store = configureStore(initialState);

function renderIndex () {
  if (store.getState().get('user')) {
    render(
    (
      <Provider store={store}>
        <AppContainer>
          <Index />
        </AppContainer>
      </Provider>
    ), window.document.getElementById('main'));
  } else {
    renderLoginPage();
  }
}

function renderPeople () {
  render(
    (
     <Provider store={store}>
        <AppContainer>
          <AddPersonForm />
          <PeopleList />
        </AppContainer>
      </Provider>
    ), window.document.getElementById('main'));
}

function renderUserSettings () {
  render(
    (
     <Provider store={store}>
        <AppContainer>
          <UserSettingsForm />
        </AppContainer>
      </Provider>
    ), window.document.getElementById('main'));
}

function renderVisits () {
  render(
    (
     <Provider store={store}>
        <AppContainer>
          <VisitList />
        </AppContainer>
      </Provider>
    ), window.document.getElementById('main'));
}

function renderLoginPage () {
  render(
    (
      <Provider store={store}>
        <LoginContainer>
          <LoginPage />
        </LoginContainer>
      </Provider>
    ), window.document.getElementById('main'));
}

page('/', renderIndex);
page('/people', renderPeople);
page('/visits', renderVisits);
page('/auth/login', renderLoginPage);
page('/settings', renderUserSettings);
page();