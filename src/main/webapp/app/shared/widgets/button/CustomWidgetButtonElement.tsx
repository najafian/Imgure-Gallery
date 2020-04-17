import React from 'react';
import {CustomWidgetCommon} from "../common/common";
import {CustomWidgetButton} from "./CustomWidgetButton";
import UniqueID from "../../utils/uniqueKey";


export class CustomWidgetButtonElement extends CustomWidgetCommon<CustomWidgetButton> {

    constructor(prop: any) {
        super(prop);
        this.widget = new CustomWidgetButton();
        this.widgetID = UniqueID();
        this.initialProps(this.props.widgetProp);
    }


    componentDidMount(): void {
        this.widget.createWidget(this.widgetID);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div style={{width: this.props.width, height: this.height}} id={this.widgetPanelID}>
                <button style={{height: this.height, fontSize: this.fontSize}} id={this.widgetID}/>
            </div>);
    }

    destroy(): void {
        this.widget.destroy();
    }
}
