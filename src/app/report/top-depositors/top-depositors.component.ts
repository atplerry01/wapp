import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { ITopDepositor, ITopDepositorWithPagination } from '../../shared/my-interfaces';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-top-depositors',
  templateUrl: './top-depositors.component.html',
  styleUrls: ['./top-depositors.component.scss']
  // animations: [fadeAnimation] // register the animation
})
export class TopDepositorsComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1; // current page
  per_page = 50;
  pre_page?: number; // previous
  next_page?: number;
  totalRecords = 0; // total record
  total_pages = 0;

  selectedDate = '';
  selectedBranchCode = '';

  reportType = 'c'; // c=CASA t=TD
  reportTypeList = [{ code: 'c', name: 'CASA' }, { code: 't', name: 'TENURED DEPOSIT' }];

  topDepositors: ITopDepositor[] = [];

  reportHeaders = [
    {
      name: 'ACCT_NUMBER',
      title: 'ACCT_NUMBER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_NAME',
      title: 'ACCOUNT NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BALANCE',
      title: 'BALANCE',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'CURRENCY_TYPE',
      title: 'CURRENCY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_TYPE',
      title: 'ACCT_TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACC_MGR',
      title: 'ACC_MGR',
      right: false,
      isDate: false,
      isNumber: false
    },
  ];


  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private excelExport: ExcelExporterService
  ) {}

  ngOnInit() {}


  getTopDepositors(exportToExcel = 0) {

    if (exportToExcel === 0) {
    this.topDepositors = [];
    }

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // tslint:disable-next-line:max-line-length
    const param = `?reportType=${this.reportType}&_date=${this.selectedDate}&branchCode=${this.selectedBranchCode}&page=${this.page}&per_page=${this.per_page}&export=${exportToExcel}`;

    this.dataService.Get(`getTopDepositors${param}`)
      .subscribe((res) => {

        if (exportToExcel === 1) {
          this.excelExport.exportAsExcelFile(res, 'topDepsoitors_Report');
        } else {
        const result: ITopDepositorWithPagination = res;
        if (result && result.data) {
          // console.log(res, result);
          this.topDepositors = result.data;
          this.pre_page = result.pre_page;
          this.next_page = result.next_page;
          this.totalRecords = result.total;
          this.total_pages = result.total_pages;
        } else {
          this.showNotFoundMsg = true;
        }
      }

        this.isInprogress = false;
      },
        error => {
           // console.log(error);
           if (exportToExcel === 0) {
           this.topDepositors = [];
           this.pre_page = null;
           this.next_page = null;
           this.totalRecords = 0;
           }

          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }


  onReportTypeChanged($event) {
    this.reportType = $event;
  }


  onSearch($event) {
   // console.log('Search params:', JSON.stringify($event));

    this.selectedDate = $event.dateFrom;
    this.selectedBranchCode = $event.branchCode;
    this.per_page = $event.per_page;

    this.getTopDepositors();
  }

  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;
    console.log('page: ', this.page);
    this.getTopDepositors();
  }


  onExportToExcel() {
    this.getTopDepositors(1);
  }
}
