import {IWidgetCommon} from '../common/common';
import {DropDownList, ChangeEventArgs, FieldSettingsModel} from '@syncfusion/ej2-dropdowns';
import {EmitType} from '@syncfusion/ej2-base';

import {CheckUserPermissionOnControl} from 'app/shared/utils/permission';
import {FloatLabelType} from "@syncfusion/ej2-inputs";

export class CustomWidgetDropDown implements IWidgetCommon<DropDownList> {
    combobox: DropDownList;
    permissionID = true;

    applyPermission(elementPermissionID: string, userPermissions: string[]): void {
        const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
        if (!isAuthenticated) {
            // this.setDisability(false);
        }
        this.permissionID = isAuthenticated;
    }

    constructor(element?: string | HTMLElement) {
        this.combobox = new DropDownList();
        this.createWidget(element);
    }

    setDataSource(dataSource: any) {
        this.combobox.dataSource = dataSource;
    }

    setEnable(stat: boolean) {
        this.combobox.enabled = stat;
    }

    getPlaceHolder() {
        return this.combobox.placeholder;
    }

    setPlaceHolder(placeholder: string) {
        this.combobox.placeholder = placeholder;
    }

    setFields(fields: FieldSettingsModel) {
        this.combobox.fields = fields;
    }

    onChange(change: EmitType<ChangeEventArgs>) {
        this.combobox.change = change;
    }

    getValue() {
        return this.combobox.value === null ? '' : this.combobox.value;
    }

    getText(): string {
        return (this.combobox.element as any).value;
    }

    setValue(value: any) {
        this.combobox.value = value;
    }

    setItemTemplate(itemTemplate: string) {
        this.combobox.itemTemplate = itemTemplate;
    }

    addItems(items: [] |
        { [key: string]: {}; } |
        string | boolean | number |
        string[] | boolean[] |
        number[], itemIndex?: number) {
        this.combobox.addItem(items);
    }

    setIndex(index: number) {
        this.combobox.index = index;
    }

    setWidgetDirection(isRtl: any): void {
        this.combobox.enableRtl = isRtl;
    }

    getItem() {
        return this.combobox.getItems();
    }

    setHeight(height: number) {
    }

    setWidth(width: number) {

    }

    destroy(): void {
        this.combobox.destroy();
    }

    getWidget() {
        return this.combobox;
    }

    setFloatLabelType(floatLabelType: FloatLabelType) {
        this.combobox.floatLabelType = floatLabelType;
    }

    getElement() {
        return this.combobox.element;
    }

    createWidget(element: any): void {
        if (element !== undefined) {
            if (element instanceof HTMLElement) {
                this.combobox.appendTo(element);
            } else {
                this.combobox.appendTo('#' + element);
            }

        }
        try {
            if (this.combobox.element !== undefined) {
                this.combobox.element.onclick = () => {
                    this.combobox.showPopup();
                };
            }
        } catch (e) {
            console.log('test Combo', e);
        }
    }

    getLabel(): string {
        return this.combobox.placeholder;
    }

    setLabel(label: string) {
        this.combobox.placeholder = label;
    }
}
