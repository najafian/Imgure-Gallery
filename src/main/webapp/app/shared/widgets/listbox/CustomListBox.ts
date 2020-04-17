import { ListBox, CheckBoxSelection, SelectionSettingsModel, ListBoxChangeEventArgs, FieldSettingsModel, SelectEventArgs } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import {IWidgetCommon} from "../common/common";
import {CheckUserPermissionOnControl} from "../../utils/permission";

ListBox.Inject(CheckBoxSelection);

export class CustomListBox implements IWidgetCommon<ListBox> {
  listBox: ListBox;
  placeholder: string;
  permissionID: boolean;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
    this.permissionID = isAuthenticated;
  }
  constructor(element?: string | HTMLElement) {
    this.listBox = new ListBox();
    this.createWidget(element);
  }

  setWidgetDirection(isRtl: any): void {
    this.listBox.enableRtl = isRtl;
  }

  setHeight(height: number) {
    this.listBox.height = height;
  }

  setWidth(width: string) {
    this.listBox.element.style.width=width;
  }

  setValue(value1: string[] | number[] | boolean[]) {
    this.listBox.value = value1;
  }

  getValue(): string[] | number[] | boolean[] {
    return this.listBox.value;
  }

  destroy(): void {
    this.listBox.destroy();
  }

  getWidget() {
    return this.listBox;
  }

  getItemTemplate(template:string) {
    this.listBox.itemTemplate = template;
  }

  setFields(fields: FieldSettingsModel) {
    this.listBox.fields = fields;
  }

  selectItems(items: string[], isSelecting?: boolean) {
    this.listBox.selectItems(items, isSelecting);
  }

  setDataSource(data: any) {
    this.listBox.dataSource = data;
  }

  setEnabled(stat: boolean) {
    this.listBox.enabled = stat;
  }

  selectionEvent(select: EmitType<SelectEventArgs>) {
    this.listBox.select = select;
  }

  ChangeEvent(change: EmitType<ListBoxChangeEventArgs>) {
    this.listBox.change = change;
  }

  setTemplate(template: string) {
    this.listBox.itemTemplate = template;
  }

  setChangeEvent(changeEventArgsEmitType: EmitType<ListBoxChangeEventArgs>) {
    this.listBox.change = changeEventArgsEmitType;
  }

  addItems(items: any, itemIndex?: number) {
    this.listBox.addItems(items, itemIndex);
  }

  selectionSettings(selectionSettingsModel: SelectionSettingsModel) {
    this.listBox.selectionSettings = selectionSettingsModel;
  }

  getElement() {
    return this.listBox.element;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.listBox.appendTo(element);
      } else {
        this.listBox.appendTo('#' + element);
      }
    }
  }

  getLabel(): string {
    return '';
  }

  setLabel(label: string) {
  }

  getPlaceHolder() {
    return this.placeholder;
  }

  setPlaceHolder(placeholder: string) {
    this.placeholder = placeholder;
  }
}
