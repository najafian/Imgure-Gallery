import {Pager} from '@syncfusion/ej2-grids'

import {CheckUserPermissionOnControl} from '../../../shared/utils/permission';
import {IWidgetCommon} from '../common/common';
import {EmitType} from '@syncfusion/ej2-base';

export class CustomWidgetPager implements IWidgetCommon<Pager> {
    pager: Pager;
    translateLabel = '';
    isAuthenticated = true;

    getLabel(): string {
        return '';
    }

    setLabel(label: string): void {

    }

    setPageSize(size: number) {
        this.pager.pageSize = size;
    }

    setDropDownChanged(dropDownChanged: EmitType<Object>) {
        this.pager.dropDownChanged = dropDownChanged;
    }

    setCurrentPage(pageNumber: number) {
        this.pager.currentPage = pageNumber;
    }

    setPageCount(count: number) {
        this.pager.pageCount = count;
    }

    setTotalRecordCount(totalRecord: number) {
        this.pager.totalRecordsCount = totalRecord;
    }

    applyPermission(elementPermissionID: string, userPermissions: string[]): void {
        const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
        this.isAuthenticated = isAuthenticated;
    }

    constructor(element?: string | HTMLElement, label?: string, isRtl?: boolean) {
        this.isAuthenticated = true;
        this.pager = new Pager();
        this.createWidget(element);
        this.setWidgetDirection(isRtl);
        this.setLabel(label);
    }


    setWidgetDirection(isRtl: any): void {
        this.pager.enableRtl = isRtl;
    }


    setHeight(height: number) {
    }

    setWidth(width: number) {
    }

    destroy(): void {
        this.pager.destroy();
    }

    getWidget() {
        return this.pager;
    }

    getElement() {
        return this.pager.element;
    }

    OnClick(click: EmitType<Object>) {
        this.pager.click = click;
    }

    createWidget(element: any): void {
        if (element !== undefined) {
            if (element instanceof HTMLElement) {
                this.pager.appendTo(element);
            } else {
                this.pager.appendTo('#' + element);
            }
        }
    }

    onClick(click: EmitType<Object>): void {
        this.pager.click = click;
    }

    addEventListener(eventName: string, handler: Function) {
        return this.pager.addEventListener(eventName, handler);
    }

    setTranslateLink(translateLabel: string) {
        this.translateLabel = translateLabel;
    }

    getTranslateLink() {
        return this.translateLabel;
    }

}
