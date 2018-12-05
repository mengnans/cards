import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './js/presentational/App';
import * as serviceWorker from './serviceWorker';
import store from "./js/store/store";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
