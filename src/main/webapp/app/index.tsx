import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import initStore from './config/store';
import {registerLocale} from './config/translation';
import {loadIcons} from './config/icon-loader';
import LoginPage from "app/component/authentication/login/login-page";
import ContainerPage from "app/component/imgur-gallery/container/container-page";
import PageNotFound from "app/component/errors/page-not-found";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@syncfusion/ej2/material.css';
import '../contents/styles/index.css';
import {CustomWidgetDropDownElement} from "app/shared/widgets/dropDownBox/CustomWidgetDropDownElement";

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
              <Route path="/gallery" component={ContainerPage}/>
              <Route exact component={LoginPage} path="/"/>
              <Route component={PageNotFound} path="*"/>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
    <div className="page-footer-class">This is Demo Project By Mehdi Najafian</div>
  </Provider>,
  rootEl
);
