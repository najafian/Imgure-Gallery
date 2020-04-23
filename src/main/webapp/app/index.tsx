import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import initStore from './config/store';
import {registerLocale} from './config/translation';
import {loadIcons} from './config/icon-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@syncfusion/ej2/material.css';
import '../contents/styles/index.css';
import App from "app/app";

const store = initStore();
registerLocale(store);

loadIcons();

const rootEl = document.getElementById('root');



ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootEl
);
