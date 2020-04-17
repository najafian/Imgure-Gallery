import {IWidgetCommon} from "../common/common";
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import {CheckUserPermissionOnControl} from 'app/shared/utils/permission';

export class CustomWidgetCheckBox implements IWidgetCommon<CheckBox> {
  checkBox: CheckBox;
  permissionID=true;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
    if (!isAuthenticated) {
      // this.setDisability(false);
    }
    this.permissionID = isAuthenticated;
  }
  constructor(element?: string | HTMLElement, isRtl?: boolean) {
    this.checkBox = new CheckBox();
    this.createWidget(element);
    this.setWidgetDirection(isRtl);
  }

  setDisability(disable: boolean) {
    this.checkBox.disabled = disable;
  }

  setWidgetDirection(isRtl: any): void {
    this.checkBox.enableRtl = isRtl;
  }

  setEnable(stat: boolean) {
    this.checkBox.disabled = !stat;
  }

  setHeight(height: number) {
  }

  setWidth(width: number) {
  }

  destroy(): void {
    this.checkBox.destroy();
  }

  getWidget() {
    return this.checkBox;
  }

  ischecked() {
    return this.checkBox.checked;
  }

  setChecked(checked: boolean) {
    this.checkBox.checked = checked;
  }

  getElement() {
    return this.checkBox.element;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.checkBox.appendTo(element);
      } else {
        this.checkBox.appendTo('#' + element);
      }
    }
  }

  setLabel(label: string) {
    this.checkBox.label = label;
  }

  onChange(onChange: EmitType<ChangeEventArgs>): void {
    this.checkBox.change = onChange;
  }

  getLabel(): string {
    return this.checkBox.label;
  }

  getPlaceHolder() {
    return this.checkBox.label;
  }

  setPlaceHolder(placeholder: string) {
    this.checkBox.label = placeholder;
  }
}
