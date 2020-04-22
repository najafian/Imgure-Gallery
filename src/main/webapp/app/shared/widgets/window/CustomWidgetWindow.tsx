import {Dialog, AnimationSettingsModel, BeforeCloseEventArgs} from '@syncfusion/ej2-popups';
import {EmitType} from '@syncfusion/ej2-base';
import {CheckUserPermissionOnControl} from '../../utils/permission';
import {IWidgetCommon} from '../common/common';

export class CustomWidgetWindow implements IWidgetCommon<Dialog> {

  dialog: Dialog;
  permissionID: boolean;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
    this.permissionID = isAuthenticated;
  }

  constructor() {
    this.dialog = new Dialog();
    this.dialog.visible = false;
  }

  getMainElement() {
    return this.dialog.element;
  }

  setModal(isModal = true): void {
    // this.dialog.isModal = isModal;
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

  showCloseIcon(showCloseIcon = true) {
    this.dialog.showCloseIcon = showCloseIcon;
  }

  setCloseEvent(beforeClose: EmitType<BeforeCloseEventArgs>) {
    this.dialog.beforeClose = beforeClose;
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

  showDialog(isFullScreen = false): void {
    this.dialog.show(isFullScreen);
  }

  setHeight(height: number | string) {
    this.dialog.height = height;
  }

  setWidgetDirection(isRtl: boolean): void {
    this.dialog.enableRtl = isRtl;
  }

  setWidth(width: number) {
    this.dialog.width = width;
  }

  allowDragging(allowDragging = true): void {
    this.dialog.allowDragging = allowDragging;
  }

  closeOnEscape(closeOnEscape = true): void {
    this.dialog.closeOnEscape = closeOnEscape;
  }

  enableResize(enableResize = true): void {
    this.dialog.enableResize = enableResize;
  }

  setContent(content: string | HTMLElement): void {
    this.dialog.content = content;
  }

  setHeaderTitle(header: string | HTMLElement): void {
    this.dialog.header = header;
  }

  setPosition(x = 'center', y = 'center'): void {
    this.dialog.position = {X: x, Y: y};
  }

  getLabel(): string {
    return '';
  }

  setLabel(label: string) {
  }
}
