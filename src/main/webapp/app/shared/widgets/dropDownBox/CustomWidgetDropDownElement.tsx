import React from 'react';
import UniqueID from "../../../shared/utils/uniqueKey";
import {CustomWidgetCommon} from "../common/common";
import {CustomWidgetDropDown} from "./CustomWidgetDropDown";

export class CustomWidgetDropDownElement extends CustomWidgetCommon<CustomWidgetDropDown> {
  combo: CustomWidgetDropDown;

  constructor(prop:any) {
    super(prop);
    this.combo = new CustomWidgetDropDown();
    this.widget = this.combo;
    this.widgetID = UniqueID();
    this.widgetPanelID = UniqueID();
    this.initialProps(this.props.widgetProp);
  }

  componentDidMount(): void {
    this.widget.createWidget(this.widgetID);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div id={this.widgetPanelID} style={{ width: this.props.width, height: this.height, display: 'flex', fontSize: this.fontSize }}>
        <div style={{ padding: '0 7px 0' }}>
          <input style={{ height: this.height, fontSize: this.fontSize, padding: '0' }} id={this.widgetID}/>
        </div>
      </div>);
  }

  destroy(): void {
    this.widget.destroy();
  }
}
