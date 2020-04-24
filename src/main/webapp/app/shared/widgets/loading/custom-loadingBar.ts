import {IWidgetCommon} from 'app/shared/widgets/common/common';

export class CustomLoadingBar implements IWidgetCommon<HTMLElement> {
  bodyElement: HTMLElement;
  loadingElement: HTMLElement;
  loadingElementTitle: HTMLElement;
  loadingContainerElement: HTMLElement;
  subBody: HTMLElement;
  showStyle = 'width:100%;height:100%;opacity:.5;background-color:#8d9696;z-index:1;position:absolute;top:0px;display:table';
  hideStyle = 'width:0px;height:0px;display:none;';

  constructor(element?: string | HTMLElement) {
    this.initLoadingElement();
    this.subBody.appendChild(this.loadingContainerElement);
    this.bodyElement.appendChild(this.subBody);
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        element.append(this.bodyElement);
      } else {
        document.getElementById(element).append(this.bodyElement);
      }
    }
    this.hideLoading();
    this.loadingContainerElement.setAttribute('class', 'app-loading');
  }

  private initLoadingElement() {
    this.bodyElement = document.createElement('div');
    this.loadingElement = document.createElement('div');
    this.loadingElement.setAttribute('class', 'loading-spinner');
    this.loadingElementTitle = document.createElement('div');
    this.loadingElementTitle.setAttribute('class', 'mobilab-icon');
    this.subBody = document.createElement('div');
    this.subBody.setAttribute('style', 'display: table-cell;vertical-align: middle;');
    this.loadingContainerElement = document.createElement('div');
    this.loadingContainerElement.appendChild(this.loadingElementTitle);
    this.loadingContainerElement.appendChild(this.loadingElement);
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
