import {IWidgetCommon} from "../common/common";

export class LoadingBar implements IWidgetCommon<HTMLElement> {
  bodyElement: HTMLElement;
  loadingElement: HTMLElement;
  loadingContainerElement: HTMLElement;
  showStyle = 'width:100%;height:100%;opacity:.5;background-color:skyblue;z-index:1;position:absolute;top:0px;';
  hideStyle = 'width:0px;height:0px;display:none;';

  constructor(element?: string | HTMLElement) {
    this.bodyElement = document.createElement('div');
    this.loadingElement = document.createElement('div');
    this.loadingContainerElement = document.createElement('div');

    this.loadingContainerElement.appendChild(this.loadingElement);
    this.bodyElement.appendChild(this.loadingContainerElement);
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        element.append(this.bodyElement);
      } else {
        document.getElementById(element).append(this.bodyElement);
      }
    }
    this.hideLoading();
    this.loadingContainerElement.setAttribute('class', 'load-container load8');
    this.loadingContainerElement.setAttribute('style', 'margin:200px auto;');
    this.loadingElement.setAttribute('class', 'loader');
  }

  hideLoading() {
    this.bodyElement.setAttribute('style', this.hideStyle);
  }

  showLoading() {
    this.bodyElement.setAttribute('style', this.showStyle);
  }

  createWidget(element: any): void {
  }

  destroy(): void {
  }

  getLabel(): string {
    return "";
  }

  getWidget(): HTMLElement {
    return undefined;
  }

  setHeight(height: number | string) {
  }

  setLabel(label: string) {
  }

  setWidgetDirection(isRtl: boolean): void {
  }

  setWidth(width: number | string) {
  }

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
  }

}
