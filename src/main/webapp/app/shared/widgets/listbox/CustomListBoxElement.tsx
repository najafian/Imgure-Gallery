import React from 'react';
import UniqueID from "../../utils/uniqueKey";
import {CustomWidgetCommon, IWidgetOps} from "../common/common";
import {CustomListBox} from "./CustomListBox";

export class CustomListBoxElement extends CustomWidgetCommon<CustomListBox> {
  listBox: CustomListBox;

  constructor(prop:any) {
    super(prop);
    this.listBox = new CustomListBox();
    this.widget = this.listBox;
    this.widgetID = UniqueID();
    this.widgetPanelID = UniqueID();
    this.initialProps(this.props.widgetProp);
  }

  initialProps(props: IWidgetOps<CustomListBox>) {
    super.initialProps(props);
  }

  componentDidMount(): void {
    this.widget.createWidget(this.widgetID);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div id={this.widgetPanelID} style={{ width: this.props.width, height: this.height, display: 'flex', fontSize: this.fontSize }}>
          <div style={{ height: this.height, fontSize: this.fontSize, padding: '0' }} id={this.widgetID}/>
      </div>);
  }

  destroy(): void {
    this.widget.destroy();
  }
}
