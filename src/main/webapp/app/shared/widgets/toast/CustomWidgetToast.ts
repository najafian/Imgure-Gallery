import {Toast, ToastModel} from '@syncfusion/ej2-notifications';

import {CheckUserPermissionOnControl} from "../../../shared/utils/permission";
import {IWidgetCommon} from "../common/common";

export class CustomWidgetToast implements IWidgetCommon<Toast> {
    toast: Toast;
    permissionID = true;

    applyPermission(elementPermissionID: string, userPermissions: string[]): void {
        const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
        this.permissionID = isAuthenticated;
    }

    constructor() {
        this.toast = new Toast();
        const div = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(div);
        this.toast.position = {X: 'Left', Y: 'Bottom'};
        this.createWidget(div);
        this.toast.cssClass = 'CustomWidget-toast-style';
    }

    hide() {
        this.toast.hide();
    }

    setWidgetDirection(isRtl: any): void {
        this.toast.position = isRtl ? {X: 'Left', Y: 'Bottom'} : {X: 'Right', Y: 'Bottom'};
        this.toast.enableRtl = isRtl;
    }

    showWithRtl(isRtl: boolean) {
        this.setWidgetDirection(isRtl);
        this.toast.show();
    }

    show(toastObj?: ToastModel) {
        this.toast.show(toastObj);
    }

    showToast(message: string) {
        this.hide();
        this.show({content: message})
    }

    setHeight(height: number) {
    }

    setWidth(width: number) {
    }

    destroy(): void {
        this.toast.destroy();
    }

    getWidget() {
        return this.toast;
    }

    getElement() {
        return this.toast.element;
    }

    OnClick(onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null) {
        this.toast.element.onclick = onclick;
    }

    createWidget(element: any): void {
        if (element !== undefined) {
            if (element instanceof HTMLElement) {
                this.toast.appendTo(element);
            } else {
                this.toast.appendTo('#' + element);
            }
        }
    }

    getLabel(): any {
        return this.toast.content;
    }

    setLabel(label: string) {
        this.toast.content = label;
    }

}
