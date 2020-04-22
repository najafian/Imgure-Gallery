import React from 'react';
import {connect} from 'react-redux';
import './login-page.css';
import {IRootState} from 'app/shared/reducer';
import {Redirect} from 'react-router';
import {login} from '../react-redux/authentication-action';
import {IWidgetOps} from 'app/shared/widgets/common/common';
import {CustomWidgetButton} from 'app/shared/widgets/button/CustomWidgetButton';
import {CustomWidgetInput} from 'app/shared/widgets/textbox/CustomWidgetInput';
import {CustomWidgetInputElement} from 'app/shared/widgets/textbox/CustomWidgetInputElement';
import {CustomWidgetButtonElement} from 'app/shared/widgets/button/CustomWidgetButtonElement';
import UniqueID from '../../../shared/utils/uniqueKey';
import {Translate, translate} from 'react-jhipster';
import {formLanguage, setLocale} from 'app/shared/reducer/locale';
import {ILanguage} from 'app/shared/utils/i-language';

interface IProps extends StateProps, DispatchProps {

}

class LoginPage extends React.Component<IProps> implements ILanguage {
  warningElementID: string;
  private iButtonSubmit: IWidgetOps<CustomWidgetButton> = {};
  private iTextBoxUseName: IWidgetOps<CustomWidgetInput> = {};
  private iTextBoxPassword: IWidgetOps<CustomWidgetInput> = {};
  private headerTitle: string;

  constructor(props: any) {
    super(props);
    this.warningElementID = UniqueID();
  }


  componentDidMount(): void {
    this.props.setLocale('en');
    const widget = this.iButtonSubmit.getWidget();
    widget.setLabel('login');
    widget.setStyleSheet('standard-button-width');
    this.iTextBoxPassword.getWidget().setType('password');
    widget.onClick(this.handleLogin);
    formLanguage.push(this);
  }

  componentDidUpdate(prevProps: Readonly<StateProps>, prevState: Readonly<DispatchProps>, snapshot?: any): void {
    if (this.props.locale !== prevProps.locale) {
      console.log(translate('login.title'))
    }
  }

  handleLogin = () => {
    const username = this.iTextBoxUseName.getWidget().getValue();
    const password = this.iTextBoxPassword.getWidget().getValue();
    this.props.login({username: username, password: password, rememberMe: false});
  };

  render() {
    if (this.props.authentication.isAuthenticated) {
      this.props.mainOperations.toastAction.showToast(translate('login.welcome'));
      return <Redirect to="/gallery"/>;
    }
    return (
      <div className="login-page-form" style={{height: '210px', width: '323px'}}>
        <div className="e-dialog e-dlg-header-content">
          <div className="tosan-login-form-header-text">
            <div>{this.headerTitle}</div>
          </div>
        </div>
        <div className="row login-form-input-row">
          <div className="col-md-12">
            <div className="login-form-input" style={{display: 'flex'}}>
              <label className="login-label-style"><Translate contentKey="login.form.username"/> :</label>
              <CustomWidgetInputElement width={'300px'}
                                        widgetProp={this.iTextBoxUseName}/>
            </div>
            <div className="login-form-input" style={{display: 'flex'}}>
              <label className="login-label-style"><Translate contentKey="login.form.password"/> :</label>
              <CustomWidgetInputElement width={'300px'}
                                        widgetProp={this.iTextBoxPassword}/>
            </div>
          </div>
          <label className="login-label-for-demo">-For entering to gallery website type: demo/demo</label>
          <div className="col-md-12 login-button">
            <CustomWidgetButtonElement width={'120px'} widgetProp={this.iButtonSubmit}/>
          </div>
        </div>
      </div>
    );
  }

  setLanguage(): void {
  }
}

const mapStateToProps = ({authentication, mainOperations, locale}: IRootState) => ({
  authentication,
  mainOperations,
  locale
});

const mapDispatchToProps = {login, setLocale};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
