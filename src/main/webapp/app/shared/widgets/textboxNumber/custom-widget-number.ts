import {NumericTextBox} from '@syncfusion/ej2-inputs';
import {FloatLabelType} from '@syncfusion/ej2-inputs';
import {IWidgetCommon} from '../common/common';

import {CheckUserPermissionOnControl} from 'app/shared/utils/permission';

export class CustomWidgetInputNumber implements IWidgetCommon<NumericTextBox> {
  numericTextBox: NumericTextBox;
  permissionID = true;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
    if (!isAuthenticated) {
      // this.setDisability(false);
    }
    this.permissionID = isAuthenticated;
  }

  constructor(element?: string | HTMLElement, placeHolder?: string, isRtl?: boolean) {
    this.numericTextBox = new NumericTextBox();
    this.setPlaceHolder(placeHolder);
    this.setFloatLabelType('Auto');
    this.setWidgetDirection(isRtl);
    this.createWidget(element);

  }

  setDecimal(number: number) {
    this.numericTextBox.decimals = number;
  }

  setWidgetDirection(isRtl: any): void {
    this.numericTextBox.enableRtl = isRtl;
  }

  setEnable(stat: boolean) {
    this.numericTextBox.enabled = stat;
  }

  render() {
    this.numericTextBox.refresh();
  }

  setHeight(height: number) {
  }

  setWidth(width: number | string) {
    this.numericTextBox.width = width;
  }

  setValue(value: number) {
    this.numericTextBox.value = value;
  }

  getValue(): number {
    return this.numericTextBox.value;
  }

  setMinAndMax(min: number, max: number) {
    this.numericTextBox.max = max;
    this.numericTextBox.min = min;
  }

  setMinValue(value: number) {
    this.numericTextBox.min = value;
  }

  destroy(): void {
    this.numericTextBox.destroy();
  }

  getWidget() {
    return this.numericTextBox;
  }


  getElement() {
    return this.numericTextBox.element;
  }

  setMaxLength(maxNumber: number) {
    this.numericTextBox.element.onkeypress = (e) => {
      if (this.numericTextBox.value.toString().length <= maxNumber) {
        return false;
      }
    };
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.numericTextBox.appendTo(element);
      } else {
        this.numericTextBox.appendTo('#' + element);
      }
      this.numericTextBox.format = '#';
    }
  }

  setFloatLabelType(floatLabelType: FloatLabelType): void {
    this.numericTextBox.floatLabelType = floatLabelType;
  }

  getPlaceHolder(): string {
    return this.numericTextBox.placeholder;
  }

  setPlaceHolder(label: string) {
    this.numericTextBox.placeholder = label;
  }

  getLabel(): string {
    return this.numericTextBox.placeholder;
  }

  setLabel(label: string) {
    this.numericTextBox.placeholder = label;
  }
}
