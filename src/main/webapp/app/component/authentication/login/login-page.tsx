import React from 'react';
import {connect} from 'react-redux';
import './login-page.css';
import {IRootState} from "../../../shared/reducer";
import {Redirect, RouteComponentProps} from "react-router";
import {login} from "../react-redux/authentication-action";
import {IWidgetOps} from "../../../shared/widgets/common/common";
import {CustomWidgetButton} from "../../../shared/widgets/button/CustomWidgetButton";
import {CustomWidgetInput} from "../../../shared/widgets/textbox/CustomWidgetInput";
import {CustomWidgetInputElement} from "../../../shared/widgets/textbox/CustomWidgetInputElement";
import {CustomWidgetButtonElement} from "../../../shared/widgets/button/CustomWidgetButtonElement";
import UniqueID from "../../../shared/utils/uniqueKey";

interface IProps extends StateProps, DispatchProps, RouteComponentProps<{}> {

}

class LoginPage extends React.Component<IProps> {
  private iButtonSubmit: IWidgetOps<CustomWidgetButton> = {};
  private iTextBoxUseName: IWidgetOps<CustomWidgetInput> = {};
  private iTextBoxPassword: IWidgetOps<CustomWidgetInput> = {};
  warningElementID: string;

  constructor(props: any) {
    super(props);
    this.warningElementID = UniqueID();
  }


  componentDidMount(): void {
    const widget = this.iButtonSubmit.getWidget();
    widget.setLabel('login');
    widget.setStyleSheet('standard-button-width');
    this.iTextBoxPassword.getWidget().setType('password');
    widget.onClick(this.handleLogin);
  }

  componentDidUpdate(prevProps: Readonly<StateProps>, prevState: Readonly<DispatchProps>, snapshot?: any): void {

  }

  handleLogin = () => {
    const username = this.iTextBoxUseName.getWidget().getValue();
    const password = this.iTextBoxPassword.getWidget().getValue();
    this.props.login({username: username, password: password, rememberMe: false});
  };

  render() {
    const {location} = this.props;
    if (this.props.authentication.isAuthenticated) {
      this.props.mainOperations.toastAction.showToast('You are welcome to our game center!');
      return <Redirect to="/gallery" />;
    }
    return (
      <div className="login-page-form" style={{height: '180px', width: '323px'}}>
        <div className="row login-form-input-row">
          <div className="col-md-12">
            <div className="login-form-input" style={{display: 'flex'}}>
              <label className="login-label-style">UserName :</label>
              <CustomWidgetInputElement width={'300px'}
                                        widgetProp={this.iTextBoxUseName}/>
            </div>
            <div className="login-form-input" style={{display: 'flex'}}>
              <label className="login-label-style">Password :</label>
              <CustomWidgetInputElement width={'300px'}
                                        widgetProp={this.iTextBoxPassword}/>
            </div>
          </div>
          <div id={this.warningElementID}/>
          <div className="col-md-12" style={{direction: "rtl"}}>
            <CustomWidgetButtonElement width={'120px'} widgetProp={this.iButtonSubmit}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({authentication,mainOperations}: IRootState) => ({
  authentication,
  mainOperations
});

const mapDispatchToProps = {login};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
