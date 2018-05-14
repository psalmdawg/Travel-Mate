import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import reducers from './reducers';

import { AUTHENTICATED } from './actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTHENTICATED });
}

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
