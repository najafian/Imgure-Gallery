import React from 'react';
import {CustomWidgetCommon} from "../common/common";
import {CustomWidgetInputNumber} from "app/shared/widgets/textboxNumber/custom-widget-number";

export class CustomWidgetNumberElement extends CustomWidgetCommon<CustomWidgetInputNumber> {
  widgetInput: CustomWidgetInputNumber;

  constructor(prop: any) {
    super(prop);
    this.widgetInput = new CustomWidgetInputNumber();
    this.widget = this.widgetInput;
    this.initialProps(this.props.widgetProp);
  }

  componentDidMount(): void {
    this.widget.createWidget(this.widgetID);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (<div id={this.widgetPanelID}
                 style={{width: this.props.width, height: this.height, display: 'flex', fontSize: this.fontSize}}>
      <div style={{padding: '0 7px 0',width:'100%'}}>
        <input style={{height: this.height}} id={this.widgetID}/>
      </div>
    </div>);
  }

  destroy(): void {
    this.widget.destroy();
  }
}
