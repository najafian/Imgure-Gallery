import React from 'react';
import UniqueID from "../../../shared/utils/uniqueKey";

export interface IWidgetCommon<T> extends IWidgetLabel {
    setHeight(height: number | string):void;

    setWidth(width: number | string):void;

    destroy(): void;

    getWidget(): T;

    createWidget(element: any): void;

    setWidgetDirection(isRtl: boolean): void;

    applyPermission(elementPermissionID: string, userPermissions: string[]): void;
}

interface IWidgetLabel {
    getLabel(): string;

    setLabel(label: string):void;
}

export enum LabelPosition {
    Left,
    Right,
    Top,
    None
}

export interface IWidgetOps<T> {
   getWidget?(): T;
}

export interface IWidgetProps {
    widgetProp: IWidgetOps<any>;
    width?: string;
}

export class CustomWidgetCommon<T> extends React.Component<IWidgetProps> {
    widgetPanelID: string;
    widgetID: string;
    fontSize='';
    height='';
    width='';
    widget!: T;

    constructor(props:any) {
        super(props);
        this.widgetPanelID = UniqueID();
        this.widgetID = UniqueID();
    }

    initialProps(widgetProp: IWidgetOps<any>) {
    widgetProp.getWidget = () => this.widget as any;
  }
}