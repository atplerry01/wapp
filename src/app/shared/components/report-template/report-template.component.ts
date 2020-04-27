import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { IBranch } from '../../my-interfaces';
import { UtilityService } from '../../service/utility.service';


@Component({
  selector: 'app-report-template',
  templateUrl: './report-template.component.html',
  styleUrls: ['./report-template.component.scss']
})
export class ReportTemplateComponent implements OnInit {
  selectedIndex = null;
  lastSelectedIndex = null;
  countSelectedIndex = 1;

  @Input() isInprogress = false;
  @Input() showNotFoundMsg = false;

  @Input()
  showCloseIcon = false;
  @Input()
  isCollapseOnSelect = false;
  @Input()
  disableMultipleCollapseOnSelectToggle = false;

  @Input()  isRowSelectable = false;
  @Output()
  rowSelectionTriggered: EventEmitter<object> = new EventEmitter<object>();

  @Input()  isMultiSelectable = false;
  checkedAll = false;
  selectedRows: any[] = [];
  @Output() multiSelectedRowsTriggered: EventEmitter<any[]> = new EventEmitter<any[]>();


  @Input() showTopCloseIcon = false;
  @Input()
  isColumnSelectable = false;
  @Output() columSelectionTriggered: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  topCloseTriggered: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  closeTriggered: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  showSearch = false;

  // filters
  @Input() showTextFilter = false;
  @Input() filterTextPlaceholder = 'Enter text to Filter';
  @Input() textFilter_width = 150;
  @Output() filterTextTriggered: EventEmitter<string> = new EventEmitter<string>();

  @Input() showDropdownFilter = false;
  @Input() filterDropdownDefaultValue: any = 'Filter...';
  @Input() filterDropdownSelectedCode: any;
  @Input() dropdownFilter_width = 150;
  @Input() dropdownFilter_Placeholder = '';
  @Input() filterDropdownList: any[] = [];
  @Output() filterDropdownTriggered: EventEmitter<any> = new EventEmitter<any>();

  @Input() showDropdownFilter2 = false;
  @Input() filterDropdownDefaultValue2: any = 'Filter...';
  @Input() filterDropdownSelectedCode2: any;
  @Input() dropdownFilter_width2 = 150;
  @Input() dropdownFilter_Placeholder2 = '';
  @Input() filterDropdownList2: any[] = [];
  @Output() filterDropdownTriggered2: EventEmitter<any> = new EventEmitter<any>();

  @Input() showEdit = false;
  @Input() showDelete = false;
  @Input() showAdd = false;
  @Output()
  editRowTriggered: EventEmitter<object> = new EventEmitter<object>();
  @Output()
  deleteRowTriggered: EventEmitter<object> = new EventEmitter<object>();
  @Output()
  AddTriggered: EventEmitter<void> = new EventEmitter<void>();

  // dates
  selectedDateFrom = '';
  selectedDateTo = '';
  @Input() dateFormat = 'DD-MMM-YYYY';
  @Input() isDateRange = false;
  @Input() showDate = false;

  @Input()
  showDropdownMenu1 = false;
  @Input() showDropdownMenu1_width = 150;
  @Input() showDropdownMenu1_Placeholder = '';

  @Input()
  showDropdownMenu2 = false;
  @Input() showDropdownMenu2_width = 150;
  @Input() showDropdownMenu2_Placeholder = '';
  @Input()
  showDropdownMenu3 = false;
  @Input() showDropdownMenu3_width = 150;
  @Input() showDropdownMenu3_Placeholder = '';

  @Input()
  dropdownMenu1SelectedCode: any;
  @Input()
  dropdownMenu2SelectedCode: any;
  @Input()
  dropdownMenu3SelectedCode: any;
  @Input()
  dropdownMenu1List: any[] = [];
  @Input()
  dropdownMenu2List: any[] = [];
  @Input()
  dropdownMenu3List: any[] = [];
  @Output()
  DropdownMenu1Triggered: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  DropdownMenu2Triggered: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  DropdownMenu3Triggered: EventEmitter<any> = new EventEmitter<any>();

  // report
  @Input()
  reportTitle = '';
  @Input()
  reportHeaders; // array of objects e.g. [{title: 'First Name', 'right': true, isDate: false, isNumber: false}]
  @Input()
  reportData: any[] = []; // array
  @Input()
  showTotal = false; // array

  // pagination
  @Input()
  showPagination = false;
  @Input()
  showPerPage = false;
  @Input()
  per_page = 30;
  @Input()
  totalRecords = 0;
  @Input()
  page = 0;
  @Input()
  total_pages = 0;
  @Output()
  pageChange: EventEmitter<number> = new EventEmitter<number>();

  // textboxes
  @Input() searchText1 = '';
  @Input() searchText2 = '';
  @Input()
  searchText1_Placeholder = '';
  @Input() searchText1_width = 150;
  @Input() searchText2_width = 150;
  @Input()
  searchText2_Placeholder = '';
  @Input()
  showBranchList = false;
  branches: IBranch[] = [];
  selectedBranchCode = '';
  @Output()
  searchTriggered: EventEmitter<object> = new EventEmitter<object>();

  @Input()
  showExcelExport = false;
  @Output()
  exportExcelTriggered: EventEmitter<void> = new EventEmitter<void>();


  @Input() isSortable = false;
  @Input() currentSortPropertyName = '';
  @Input() currentSortOrder = 'asc';
  @Output() sortTriggered: EventEmitter<object> = new EventEmitter<object>();

  myAccess: any = {};
  @Input()
  showAccess = true;
  @Input()
  moduleName = '';
  @Output()
  myAccessTriggered: EventEmitter<object> = new EventEmitter<object>();

  @Input()
  showTitleButton = false;
  @Input()
  titleButtonLabel = 'Create';
  @Output()
  titleButtonTriggered: EventEmitter<void> = new EventEmitter<void>();

  constructor(private utilityService: UtilityService) {}

  ngOnInit() {

    if (this.isMultiSelectable) {
      this.isRowSelectable = false;
    }

    if (!this.isRowSelectable && !this.isMultiSelectable) {
      this.isCollapseOnSelect = false;
    }

    this.myAccess = this.utilityService.getAccessInfo(this.moduleName);
    this.myAccessTriggered.emit(this.myAccess);

    if (this.showBranchList) {
      this.loadBranchList();
    }

  }

  loadBranchList() {
   // console.log(this.myAccess);
    this.utilityService.getBranchList(this.myAccess).subscribe(
      res => {
        this.branches = res;
        this.branches.unshift({ branchcode: 0, branch: 'All', zonecode: 0});
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  Date1_Changed($event) {
    this.selectedDateFrom = $event;
  }

  Date2_Changed($event) {
    this.selectedDateTo = $event;
  }

  getValue(rd, x) {
    return _.get(rd, this.reportHeaders[x].name);
  }

  getPictureSizeWith(rd, x) {
    return _.get(rd, this.reportHeaders[x].pictureSize.width);
  }
  getPictureSizeHeight(rd, x) {
    return _.get(rd, this.reportHeaders[x].pictureSize.height);
  }

  getCode(x) {
    if (_.get(this.reportHeaders[x], 'isDate')) {
      return 2;
    } else if (_.get(this.reportHeaders[x], 'isNumber')) {
      return 3;
    } else if (_.get(this.reportHeaders[x], 'isPicture')) {
      return 4;
    } else {
      return 1;
    }
  }

  onPageChange(offset) {
    this.pageChange.emit(offset);

    this.checkedAll = false;
  }

  onSearch() {
    if (this.isMultiSelectable) {
    this.selectedRows = [];
    this.checkedAll = false;
    }

    const params = {
      branchCode: this.selectedBranchCode,
      dateFrom: this.selectedDateFrom,
      dateTo: this.selectedDateTo,
      sText1: this.searchText1,
      sText2: this.searchText2,
      per_page: this.per_page,
      lowerAccess:
        this.myAccess.key === 'B' || this.myAccess.key === 'S' ? true : false
    };
    this.searchTriggered.emit(params);
  }

  filterDropdownChanged() {
    this.filterDropdownTriggered.emit(this.filterDropdownSelectedCode);
  }

  filterDropdownChanged2() {
    this.filterDropdownTriggered2.emit(this.filterDropdownSelectedCode2);
  }

  DropdownMenu1Changed() {
    this.DropdownMenu1Triggered.emit(this.dropdownMenu1SelectedCode);
  }

  DropdownMenu2Changed() {
    this.DropdownMenu2Triggered.emit(this.dropdownMenu2SelectedCode);
  }

  DropdownMenu3Changed() {
    this.DropdownMenu3Triggered.emit(this.dropdownMenu3SelectedCode);
  }

  getSelectedRow(index, selectedRow, columnName) {

    if (this.isColumnSelectable && !this.isRowSelectable) {
      this.columSelectionTriggered.emit(columnName);
      return;
    } else  if (!this.isColumnSelectable && !this.isRowSelectable) {
      return;
    }

    if (this.isColumnSelectable) {
      this.columSelectionTriggered.emit(columnName);
    }

    if (this.disableMultipleCollapseOnSelectToggle) {
      this.countSelectedIndex++;

      if (index !== this.lastSelectedIndex) {
        this.countSelectedIndex = 1;
      }

      if (this.countSelectedIndex > 2) {
        return;
      }

      this.lastSelectedIndex = index;
    }

    this.selectedIndex = index === this.selectedIndex ? null : index;
    this.rowSelectionTriggered.emit(selectedRow);

  }

  close() {
    if (this.disableMultipleCollapseOnSelectToggle) {
      this.countSelectedIndex++;
    }

    this.selectedIndex = null;
    this.closeTriggered.emit();
  }

  topClose() {
    this.topCloseTriggered.emit();
  }


  ExportDataToExcel() {
    this.exportExcelTriggered.emit();
  }

  onFilterTextChange(value) {
    this.filterTextTriggered.emit(value);
  }

  onEditRow(selectedRow) {
    this.editRowTriggered.emit(selectedRow);
  }

  onDeleteRow(selectedRow) {
    this.deleteRowTriggered.emit(selectedRow);
  }

  onAddRow() {
    this.AddTriggered.emit();
  }

  sortable(propertyName: string) {
    if (!this.isSortable) {
      return;
    }

    if (this.currentSortPropertyName === propertyName) {
      this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortPropertyName = propertyName;
      this.currentSortOrder = 'asc';
    }

    this.sortTriggered.emit({property: propertyName, order: this.currentSortOrder});
  }

  setCheckedItem(selRow: object) {
    const newSelection = [...this.selectedRows];

    const indx = newSelection.findIndex(n => _.isEqual(n, selRow));
   // console.log('indx:', indx);

    if (indx > -1) {
      newSelection.splice(indx, 1);
    } else {
      newSelection.push(selRow);
    }

    this.selectedRows = newSelection;
    this.checkedAll = newSelection.length === this.reportData.length ? true : false;
    this.multiSelectedRowsTriggered.emit(this.selectedRows);
  }

  setAllCheckedItems() {
    this.checkedAll = !this.checkedAll;
    const newSelection = [...this.selectedRows];

    if (this.checkedAll) {
      this.reportData.forEach(r => {
        const indx = newSelection.findIndex(n => _.isEqual(n, r));
        if (indx === -1) {
          newSelection.push(r);
        }
      });
    } else {
      this.reportData.forEach(r => {
        const indx = newSelection.findIndex(n => _.isEqual(n, r));
        if (indx > -1) {
          newSelection.splice(indx, 1);
        }
      });
    }

    this.selectedRows = newSelection;
    this.multiSelectedRowsTriggered.emit(this.selectedRows);
   // console.log('this.checkedAll: ', this.checkedAll);
  }

  isChecked(selRow: object) {
    return this.selectedRows.findIndex(n => _.isEqual(n, selRow)) > -1 ? true : false;
  }

  titleButtonEvent() {
    this.titleButtonTriggered.emit();
  }

}

// enum eFilterType {
//   text,
//   dropdown
// }
