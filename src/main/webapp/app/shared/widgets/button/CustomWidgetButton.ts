import {Button} from '@syncfusion/ej2-buttons';

import {CheckUserPermissionOnControl} from 'app/shared/utils/permission';
import {IWidgetCommon} from '../common/common';
import {FloatLabelType} from '@syncfusion/ej2-inputs';

export class CustomWidgetButton implements IWidgetCommon<Button> {
  button: Button;
  translateLabel = '';
  placeholder = '';
  isAuthenticated = true;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
    if (!isAuthenticated) {
      this.setDisability(false);
    }
    this.isAuthenticated = isAuthenticated;
  }

  constructor(element?: string | HTMLElement, label?: string, isRtl?: boolean) {
    this.isAuthenticated = true;
    this.button = new Button();
    this.createWidget(element);
    this.setWidgetDirection(isRtl);
    this.setLabel(label);
    this.button.cssClass = 'e-control e-btn e-lib e-outline e-primary';
  }

  setDisability(disable: boolean) {
    this.button.disabled = !this.isAuthenticated || disable;
  }

  setWidgetDirection(isRtl: any): void {
    this.button.enableRtl = isRtl;
  }

  setEnable(isEnabled: boolean) {
    this.setDisability(!isEnabled);
  }

  setHeight(height: number) {
  }

  setWidth(width: number) {
  }

  setStyleSheet(styleName: string) {
    this.button.cssClass += ' ' + styleName;
  }

  destroy(): void {
    this.button.destroy();
  }

  getWidget() {
    return this.button;
  }

  getElement() {
    return this.button.element;
  }

  OnClick(onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null) {
    this.button.element.onclick = onclick;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.button.appendTo(element);
      } else {
        this.button.appendTo('#' + element);
      }
    }
  }

  onClick(onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null): void {
    if (this.isAuthenticated) {
      this.button.element.onclick = onclick;
    }
  }

  setLabel(label?: string) {
    if (label !== undefined) {
      this.button.content = label;
    }
  }


  getLabel() {
    return this.button.content;
  }

  setTranslateLink(translateLabel: string) {
    this.translateLabel = translateLabel;
  }

  getTranslateLink() {
    return this.translateLabel;
  }

  getPlaceHolder() {
    return this.placeholder;
  }

  setPlaceHolder(placeholder: string) {
    this.placeholder = placeholder;
  }
  setFloatLabelType(floatLabelType: FloatLabelType): void {

  }
}
