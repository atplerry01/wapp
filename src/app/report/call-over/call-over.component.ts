import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';
import { ICallOver, ICallOverWithPagination } from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-call-over',
  templateUrl: './call-over.component.html',
  styleUrls: ['./call-over.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class CallOverComponent implements OnInit {


  isInprogress = false;
  showNotFoundMsg = false;
  selectedType = 'casa';
  accounts: ICallOver[] = [];
  selectedBranchCode = '0';

  page = 1; // current page
  per_page = 100;
  totalRecords = 0; // total record
  total_pages = 0;
  // pages: number[] = [];
  filterUserId = '';
  tellers: IDropdownList[] = [];
  showFilterDropdownList = false;

  myAccess: any = {};

  // datePickerConfigTo: IDatePickerConfig;
  selectedDateFrom = '';
  // selectedDateTo = '';

  reportHeaders = [
    { name: 'INIT_SOL_ID', title: 'Branch', right: false, isDate: false, isNumber: false },
    { name: 'ENTRY_USER_ID', title: 'Entry User', right: false, isDate: false, isNumber: false },
    { name: 'TRAN_TYPE', title: 'Trans. Type', right: false, isDate: false, isNumber: false },
    { name: 'TRAN_SUB_TYPE', title: 'Trans. Sub Type', right: false, isDate: false, isNumber: false },
    { name: 'FORACID', title: 'Account #', right: false, isDate: false, isNumber: false },
    { name: 'ACCT_NAME', title: 'Customer Name', right: false, isDate: false, isNumber: false },
    { name: 'TRAN_ID', title: 'Tran. ID', right: false, isDate: false, isNumber: false },
    { name: 'CREDIT', title: 'Credit', right: true, isDate: false, isNumber: true, total: 0},
    { name: 'DEBIT', title: 'Debit', right: true, isDate: false, isNumber: true, total: 0 },
    { name: 'NARRATION', title: 'Narration', right: false, isDate: false, isNumber: false },
    { name: 'TRAN_DATE', title: 'Trans. Date', right: false, isDate: true, isNumber: false },
    { name: 'VALUE_DATE', title: 'Value Date', right: false, isDate: true, isNumber: false}
  ];

  constructor(private dataService: DataService, private utilityService: UtilityService, private excelExporterService: ExcelExporterService) {
  }


  ngOnInit() {

  }

  getCallOver() {

    if (!this.selectedDateFrom) {
      this.utilityService.showInfoToast('Please select date!', 'Date is Required');
      return;
    }

    this.showNotFoundMsg = false;
    this.showFilterDropdownList = false;
    this.isInprogress = true;

    const param = `selecteddate=${this.selectedDateFrom}&branchCode=${this.selectedBranchCode}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(`getCallOver?${param}&filterUserId=${this.filterUserId}`)
      .subscribe((res) => {

        const result: ICallOverWithPagination = res;
        if (result && result.data) {
          // console.log(res, result);
          this.accounts = result.data;

          if (result.tellers.length) {
          result.tellers.forEach(t => {
            const teller: IDropdownList = { code: t, name: t};
            this.tellers.push(teller);
          });
          this.showFilterDropdownList = true;
        }

          this.totalRecords = result.total;
          this.total_pages = result.total_pages;

          this.reportHeaders[7].total = result.totalCredit;
          this.reportHeaders[8].total = result.totalDebit;

        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.accounts = [];
          this.totalRecords = 0;
          this.total_pages = 0;
          this.tellers = [];

          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }

  getUserAccess($event) {
    this.myAccess = $event;
  }

  onSearch($event) {
    // console.log('Search params:', JSON.stringify($event));

     this.selectedDateFrom = $event.dateFrom;
     this.selectedBranchCode = $event.branchCode;

     this.per_page = $event.per_page;

     this.getCallOver();
   }

   filterTellersDropdownChanged($event) {
     this.filterUserId = $event;
     this.getCallOver();
   }


  ExportDataToExcel() {

    this.isInprogress = true;
    const param =  `selecteddate=${this.selectedDateFrom}&branchCode=${this.selectedBranchCode}&page=${this.page}&per_page=${this.per_page}`;
    this.dataService.Get(`getCallOver?${param}&filterUserId=${this.filterUserId}&export=1`)
      .subscribe((res) => {
        const data: ICallOver[] = res;
        this.excelExporterService.exportAsExcelFile(data, `CallOver_${this.selectedDateFrom}_${this.selectedBranchCode}_${this.filterUserId}`);
        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }

  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;
    this.getCallOver();

  }


}

interface IDropdownList {
  code: string;
  name: string;
}

