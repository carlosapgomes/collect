import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import {Router, Route} from 'react-router';
import {Provider} from 'react-redux';
//import store, {history} from './store';
import store from './store';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/app" component={App}></Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
