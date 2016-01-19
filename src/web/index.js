import { render } from 'react-dom';
import React, { Component } from 'react';
import page from 'page';
import { Provider } from 'react-redux';
import initialState from './store/initialState';
import configureStore from './store/configureStore';

import AppContainer from './containers/AppContainer';

import Index from './components/Index';

const store = configureStore(initialState);

function renderIndex () {
  render(
    (
      <Provider store={store}>
        <AppContainer>
          <Index />
        </AppContainer>
      </Provider>
    ), window.document.getElementById('main'));
}

page('/', renderIndex);
page();

// class Main extends Component {
//   render () {
//     return (
//       <div>Testing 3</div>
//     );
//   }
// }

// render(<Main />, window.document.getElementById('main'));