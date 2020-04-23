import React from 'react';
import {ILanguage} from 'app/shared/utils/i-language';
import {IRootState} from 'app/shared/reducer';
import {login} from 'app/component/authentication/react-redux/authentication-action';
import {setLocale} from 'app/shared/reducer/locale';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ContainerPage from 'app/component/imgur-gallery/container/container-page';
import LoginPage from 'app/component/authentication/login/login-page';
import PageNotFound from 'app/component/errors/page-not-found';
import {CustomWidgetDropDownElement} from 'app/shared/widgets/dropDownBox/CustomWidgetDropDownElement';
import {IWidgetOps} from 'app/shared/widgets/common/common';
import {CustomWidgetDropDown} from 'app/shared/widgets/dropDownBox/CustomWidgetDropDown';

interface IProps extends StateProps, DispatchProps {

}

class App extends React.Component<IProps> implements ILanguage {
  private iDropDownChangeLanguage: IWidgetOps<CustomWidgetDropDown> = {};

  componentDidMount(): void {
    let languageWidget = this.iDropDownChangeLanguage.getWidget();
    languageWidget.setDataSource([
      {text: 'English', value: 'en'},
      {text: 'Deutsche', value: 'de'},
      {text: 'Türkiye', value: 'tr'}
    ]);
    languageWidget.setIndex(0);
    languageWidget.onChange(e => {
      this.props.setLocale(e.itemData.value);
      console.log(e.itemData.value);
    });
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const baseHref = document
      .querySelector('base')
      .getAttribute('href')
      .replace(/\/$/, '');
    return <div className="fullScreen-page-class" id="iScroll">
      <CustomWidgetDropDownElement width="50" widgetProp={this.iDropDownChangeLanguage}/>
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
      <div className="page-footer-class">This is Demo Project By Mehdi Najafian</div>
    </div>;
  }

  setLanguage(): void {
  }

}

const mapStateToProps = ({mainOperations, locale}: IRootState) => ({
  mainOperations,
  locale
});

const mapDispatchToProps = {login, setLocale};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
