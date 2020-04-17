import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import initStore from './config/store';
import {registerLocale} from './config/translation';
import {loadIcons} from './config/icon-loader';
import PageNotFound from "app/component/errors/page-not-found";

import '../contents/styles/index.css';

const store = initStore();
registerLocale(store);

loadIcons();

const rootEl = document.getElementById('root');
const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

ReactDOM.render(
  <Provider store={store}>
    <div className="fullScreen-page-class">
      <div className="image-background-class">
        <div className="center-form-class">
          <Router basename={baseHref}>
            <Switch>
              <Route exact component={PageNotFound} path="*"/>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
    <div className="page-footer-class">This is Demo Project By Mehdi Najafian</div>
  </Provider>,
  rootEl
);
