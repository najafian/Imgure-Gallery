import React from 'react';
import UniqueID from "../../../shared/utils/uniqueKey";
import {CustomWidgetCommon} from "../common/common";
import {CustomWidgetCheckBox} from "./CustomWidgetCheckBox";

export class CustomWidgetCheckBoxElement extends CustomWidgetCommon<CustomWidgetCheckBox> {
  combo: CustomWidgetCheckBox;

  constructor(prop:any) {
    super(prop);
    this.combo = new CustomWidgetCheckBox();
    this.widget = this.combo;
    this.widgetID = UniqueID();
    this.initialProps(this.props.widgetProp);
  }

  componentDidMount(): void {
    this.widget.createWidget(this.widgetID);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div style={{ width: this.props.width, height: this.height }} id={this.widgetPanelID}>
        <input style={{ height: this.height, fontSize: this.fontSize, padding: '0' }} id={this.widgetID}/>
      </div>);
  }

  destroy(): void {
    this.widget.destroy();
  }
}
