import {FloatLabelType, TextBox} from '@syncfusion/ej2-inputs';
import {IWidgetCommon} from "../common/common";

import {CheckUserPermissionOnControl} from 'app/shared/utils/permission';

export class CustomWidgetInput implements IWidgetCommon<TextBox> {
    textBox: TextBox;
    permissionID = true;

    applyPermission(elementPermissionID: string, userPermissions: string[]): void {
        const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
        if (!isAuthenticated) {
            // this.setDisability(false);
        }
        this.permissionID = isAuthenticated;
    }

    constructor(element?: string | HTMLElement, placeHolder?: string, isRtl?: boolean) {
        this.textBox = new TextBox();
        this.setPlaceHolder(placeHolder);
        this.setFloatLabelType('Auto');
        this.setWidgetDirection(isRtl);
        this.createWidget(element);
    }

    setWidgetDirection(isRtl: any): void {
        this.textBox.enableRtl = isRtl;
    }

    setEnable(stat: boolean) {
        this.textBox.enabled = stat;
    }

    setType(type: string) {
        this.textBox.type = type;
    }

    addAttributes(attributes: Array<{ [key: string]: string }>) {
        attributes.forEach(a => this.textBox.addAttributes(a));
    }

    render() {
        this.textBox.refresh();
    }

    setHeight(height: number) {
    }

    setWidth(width: number | string) {
        this.textBox.width = width;
    }

    setValue(value: string) {
        this.textBox.value = value;
    }

    getValue() {
        return (this.textBox.value !== null && this.textBox.value.length > 0) ? this.textBox.value : '';
    }

    destroy(): void {
        this.textBox.destroy();
    }

    getWidget() {
        return this.textBox;
    }


    getElement() {
        return this.textBox.element;
    }

    setMaxLength(maxNumber: number) {
        this.textBox.element.onkeypress = (e) => {
            console.log(this.textBox.value);
            if (this.textBox.value.length <= maxNumber) {
                return false;
            }
        };
    }

    createWidget(element: any): void {
        if (element !== undefined) {
            if (element instanceof HTMLElement) {
                this.textBox.appendTo(element);
            } else {
                this.textBox.appendTo('#' + element);
            }
        }
    }

    setFloatLabelType(floatLabelType: FloatLabelType): void {
        this.textBox.floatLabelType = floatLabelType;
    }

    getPlaceHolder(): string {
        return this.textBox.placeholder;
    }

    setPlaceHolder(label: string) {
        this.textBox.placeholder = label;
    }

    getLabel(): string {
        return this.textBox.placeholder;
    }

    setLabel(label: string) {
        this.textBox.placeholder = label;
    }
}
