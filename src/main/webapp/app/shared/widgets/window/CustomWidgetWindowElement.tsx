import React, {Component} from 'react';
import {Dialog, AnimationSettingsModel} from '@syncfusion/ej2-popups';
import {IWidgetCommon} from '../common/common';
import UniqueID from '../../utils/uniqueKey';

export interface IWindowWidget {
  widget?: CustomWidgetWindowElement;
}

export interface IWindowAction {
  showWindow(data: any, type: any): boolean;

  close(event: Function): boolean;
}

interface IState {
  windowWidget: IWindowWidget;
  settleElementID: string;
  height: number;
  width: number;
}

export class CustomWidgetWindowElement extends Component<IState> implements IWidgetCommon<Dialog> {
  dialog: Dialog;
  windowID: string;

  getLabel(): string {
    return '';
  }

  setLabel(label: string) {
  }

  constructor(prop: any) {
    super(prop);
    this.dialog = new Dialog();
    this.dialog.isModal = true;
    this.dialog.showCloseIcon = true;
    this.dialog.allowDragging = true;
    this.windowID = UniqueID();
    this.dialog.height = this.props.height;
    this.dialog.width = this.props.width;
    this.dialog.visible = false;
    this.props.windowWidget.widget = this;

    this.setPosition('center', 'center');
    this.setAnimationSettings({duration: 100, effect: 'None'});
  }

  close() {
    this.dialog.hide();
  }

  setAnimationSettings(props: AnimationSettingsModel) {
    this.dialog.animationSettings = props;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.dialog.appendTo(element);
      } else {
        this.dialog.appendTo('#' + element);
      }
    }
  }

  setTargetElement(target: string | HTMLElement = '#app-view-container') {
    this.dialog.target = target;
  }

  destroy(): void {
    this.dialog.destroy();
  }

  getWidget(): any {
    return this.dialog;
  }

  showDialog(): void {
    if (this.dialog.element === undefined) {
      this.setTargetElement('#' + this.props.settleElementID);
      this.createWidget(this.windowID);
    }
    document.getElementById(this.windowID).style.display = '';
    this.dialog.show(false);
  }

  setHeight(height: number | string) {
    this.dialog.height = height;
  }

  refresh() {
    this.dialog.refresh();
  }

  setWidth(width: number | string) {
    this.dialog.width = width;
  }

  setHeaderTitle(header: string | HTMLElement): void {
    if (header instanceof HTMLElement) {
      this.dialog.header = header;
    }
    this.dialog.header = `<span style="font-size: 13px;color: #1f194e;width: calc(100% - 10px);text-align: end;">${header}</span>`;
  }

  setPosition(x = 'center', y = 'center'): void {
    this.dialog.position = {X: x, Y: y};
  }

  render() {
    return (
      <div style={{display: 'none'}} id={this.windowID}>
        {this.props.children}
      </div>);
  }

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
  }

  setWidgetDirection(isRtl: boolean): void {
  }
}
