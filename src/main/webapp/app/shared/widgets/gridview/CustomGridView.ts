import {
  ContextMenu,
  Resize,
  Grid,
  Filter,
  Page,
  Selection,
  Edit,
  Toolbar,
  // ToolbarItems,
  CommandColumn,
  Sort,
  DetailRow,
  ExcelExport,
  PdfExport,
  Group,
  SearchEventArgs,
  FilterEventArgs,
  GroupEventArgs,
  PageEventArgs,
  ActionEventArgs,
  EditEventArgs,
  DeleteEventArgs,
  SaveEventArgs,
  AddEventArgs,
  SortEventArgs,
  Column,
  ColumnModel,
  TextWrapSettingsModel,
  RowSelectEventArgs,
  EditMode,
  ToolbarItems,
  ToolbarItem,
  NewRowPosition,
  PageSettingsModel,
  CellSaveArgs, FilterSettingsModel
} from '@syncfusion/ej2-grids';
import {EmitType} from '@syncfusion/ej2-base';
import {ItemModel} from '@syncfusion/ej2-navigations';
import {IWidgetCommon} from "../common/common";
import {CheckUserPermissionOnControl} from "../../utils/permission";

Grid.Inject(ContextMenu, Resize, Filter, Page, Selection, Toolbar, CommandColumn, Sort, DetailRow, ExcelExport, PdfExport, Group, Edit);


export class CustomGridView implements IWidgetCommon<Grid> {
  grid: Grid;
  rowItem: any;
  isAuthenticated: boolean;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
    this.isAuthenticated = isAuthenticated;
  }

  constructor() {
    this.grid = new Grid();
    this.grid.rowSelected = (e: RowSelectEventArgs) => {
      this.rowItem = e.data;
    };
    this.grid.gridLines = 'Both';
    this.enableHover(true);
    this.rowHeight(20);
    this.grid.allowResizing = true;
    this.grid.allowTextWrap = false;
  }

  removeSelectedRow() {
    // this.grid.deleteRecord(this.getSelectedRowItem());
    this.grid.dataSource = (this.grid.dataSource as []).filter(f => f !== this.getSelectedRowItem());
    this.grid.dataBind();
  }

  selectedEvent(rowSelected: EmitType<RowSelectEventArgs>) {
    this.grid.rowSelected = rowSelected;
  }


  getSelectedRowItem(): any {
    return this.grid.getRowObjectFromUID(this.grid.getSelectedRows()[0].getAttribute('data-uid')).data as any;
  }

  allowTextWrap(allowTextWrap: boolean) {
    this.grid.allowTextWrap = allowTextWrap;
  }

  textWrapSettings(textWrapSettings: TextWrapSettingsModel) {
    this.grid.textWrapSettings = textWrapSettings;
  }

  getElement() {
    return this.grid.element;
  }

  setDataSource(data: any): void {
    this.grid.dataSource = data;
  }

  addOrUpdateRow(data: any, idName: string) {
    const dataSource = this.getDataSource();
    const filter = dataSource.filter((f: any) => f[idName] !== data[idName]);
    filter.push(data);
    this.setDataSource(filter);
    this.dataBind();
  }

  onCellSaved(cellSaved: EmitType<CellSaveArgs>) {
    this.grid.cellSaved = cellSaved;
  }

  getDataSource(): any {
    return this.grid.dataSource;
  }

  getSelectedRows(): Element[] {
    return this.grid.getSelectedRows();
  }

  onSelect(rowSelected: EmitType<RowSelectEventArgs>) {
    this.grid.rowSelected = rowSelected;
  }

  onActionComplete(actionComplete: EmitType<PageEventArgs |
    GroupEventArgs |
    FilterEventArgs |
    SearchEventArgs |
    SortEventArgs |
    AddEventArgs |
    SaveEventArgs |
    EditEventArgs |
    DeleteEventArgs |
    ActionEventArgs>) {
    this.grid.actionComplete = actionComplete;
  }

  allowPaging(allowPaging: boolean): void {
    this.grid.allowPaging = allowPaging;
  }

  allowGrouping(allowGrouping: boolean): void {
    this.grid.allowGrouping = allowGrouping;
  }

  actionBegin(actionBegin: EmitType<PageEventArgs |
    GroupEventArgs |
    FilterEventArgs |
    SearchEventArgs |
    SortEventArgs |
    AddEventArgs |
    SaveEventArgs |
    EditEventArgs |
    DeleteEventArgs |
    ActionEventArgs>) {
    this.grid.actionBegin = actionBegin;
  }

  allowReordering(allowReordering: boolean): void {
    this.grid.allowReordering = allowReordering;
  }

  allowFiltering(allowFiltering: boolean): void {
    this.grid.allowFiltering = allowFiltering;
  }

  allowSorting(allowSorting: boolean): void {
    this.grid.allowSorting = allowSorting;
  }

  allowExcelExport(allowExcelExport: boolean): void {
    this.grid.allowExcelExport = allowExcelExport;
  }

  allowPdfExport(allowPdfExport: boolean): void {
    this.grid.allowPdfExport = allowPdfExport;
  }

  editSettings(allowEditing?: boolean, allowAdding?: boolean, allowDeleting?: boolean, mode?: EditMode, newRowPosition?: NewRowPosition, editTemplate?: string): void {
    if (allowEditing || allowAdding || allowDeleting) {
      Grid.Inject(Edit, Toolbar);
    }
    this.grid.editSettings.template = editTemplate;
    this.grid.editSettings.allowEditing = allowEditing;
    this.grid.editSettings.allowAdding = allowAdding;
    this.grid.editSettings.allowDeleting = allowDeleting;
    this.grid.editSettings.newRowPosition = newRowPosition;
    this.grid.editSettings.mode = mode;
  }

  showDeleteConfirmDialog(showDeleteConfirmDialog: boolean): void {
    this.grid.editSettings.showDeleteConfirmDialog = showDeleteConfirmDialog;
  }

  setGridLine(gridLine: any) {
    this.grid.gridLines = gridLine;
  }

  allowEditOnDblClick(allowEditOnDblClick: boolean): void {
    this.grid.editSettings.allowEditOnDblClick = allowEditOnDblClick;
  }

  allowNextRowEdit(allowNextRowEdit: boolean): void {
    this.grid.editSettings.allowNextRowEdit = allowNextRowEdit;
  }

  enableHover(enableHover: boolean): void {
    this.grid.enableHover = enableHover;
  }

  newRowPosition(newRowPosition: any): void {
    this.grid.editSettings.newRowPosition = newRowPosition;
  }

  showConfirmDialog(showConfirmDialog: boolean): void {
    this.grid.editSettings.showConfirmDialog = showConfirmDialog;
  }

  editTemplate(template: any): void {
    this.grid.editSettings.template = template;
  }

  enableRowHovering(isHover: boolean) {
    this.grid.enableHover = isHover;
  }

  contextMenuItems(contextMenuItems: any): void {
    // ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending','Cancel', 'Copy', 'Edit', 'Delete', 'Save',
    // 'Cancel','PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage','LastPage', 'NextPage']
    this.grid.contextMenuItems = contextMenuItems;
  }

  addToolbar(toolbar: Array<(ToolbarItems | string | ItemModel | ToolbarItem)>): void {
    //  toolbar: [ 'Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport', 'Search','PdfExport'],
    this.grid.toolbar = toolbar;
  }

  enableColumnVirtualization(enableVirtualization: boolean) {
    this.grid.enableColumnVirtualization = enableVirtualization;
  }

  enableVirtualization(enableVirtualization: boolean): void {
    this.grid.enableVirtualization = enableVirtualization;
  }

  filterSettings(filterSettings: FilterSettingsModel): void {
    this.grid.filterSettings = filterSettings;
  }

  selectionSettings(persistSelection?: boolean, type?: any, checkboxOnly?: boolean, cellSelectionMode?: any, checkboxMode?: any,
                    enableSimpleMultiRowSelection?: any, enableToggle?: any, mode?: any): void {
    this.grid.selectionSettings.persistSelection = persistSelection;
    this.grid.selectionSettings.type = type;
    this.grid.selectionSettings.checkboxOnly = checkboxOnly;
    this.grid.selectionSettings.cellSelectionMode = cellSelectionMode;
    this.grid.selectionSettings.checkboxMode = checkboxMode;
    this.grid.selectionSettings.enableSimpleMultiRowSelection = enableSimpleMultiRowSelection;
    this.grid.selectionSettings.enableToggle = enableToggle;
    this.grid.selectionSettings.mode = mode;
  }

  rowHeight(rowHeight: number): void {
    this.grid.rowHeight = rowHeight;
  }

  pageSettings(pageSettings: PageSettingsModel): void {
    this.grid.pageSettings = pageSettings;
  }

  getPageSettings(): PageSettingsModel {
    return this.grid.pageSettings;
  }

  columns(columns: Column[] | string[] | ColumnModel[]): void {
    this.grid.columns = columns;
  }

  setColumnHeaderText(columns: Column[] | string[] | ColumnModel[]) {
    columns.forEach((a: any) => {
      const col = a as ColumnModel;
      this.grid.getColumnByField(col.field).headerText = col.headerText;
    });
    try {
      this.grid.refreshHeader();
    } catch (e) {
      console.log(e);
    }
  }

  actionComplete(actionComplete: any): void {
    this.grid.actionComplete = actionComplete;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.grid.appendTo(element);
      } else {
        this.grid.appendTo('#' + element);
      }
    }
  }

  destroy(): void {
    this.grid.destroy();
  }

  getWidget(): Grid {
    return this.grid;
  }

  setHeight(height: number | string) {
    this.grid.height = height;
  }

  setWidth(width: number) {
    this.grid.width = width;
  }

  dataBind(): void {
    try {
      this.grid.dataReady();
    } catch (e) {
      console.log(e);
    }
  }

  refresh(): void {
    this.grid.refresh();
  }

  enableAltRow(enableAltRow: boolean): void {
    this.grid.enableAltRow = enableAltRow;
  }

  getLabel(): string {
    return '';
  }

  setLabel(label: string) {
  }

  private setDisability(b: boolean) {
  }

  setWidgetDirection(isRtl: boolean): void {
  }
}
