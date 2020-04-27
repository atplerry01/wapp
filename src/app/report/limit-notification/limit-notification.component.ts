import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';
import { ILimitNotification, ILimitNotificationWithPagination } from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-limit-notification',
  templateUrl: './limit-notification.component.html',
  styleUrls: ['./limit-notification.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class LimitNotificationComponent implements OnInit {


  isInprogress = false;
  showNotFoundMsg = false;
  accounts: ILimitNotification[] = [];

  page = 1; // current page
  per_page = 100;
  totalRecords = 0; // total record
  total_pages = 0;


  selectedDateFrom = '';
  selectedDateTo = '';

  reportHeaders = [
    { name: 'AccountName', title: 'Account Name', right: false, isDate: false, isNumber: false },
    { name: 'AccountNo', title: 'Account No.', right: false, isDate: false, isNumber: false },
    { name: 'Phone', title: 'Phone', right: false, isDate: false, isNumber: false },
    { name: 'BranchCode', title: 'Branch', right: false, isDate: false, isNumber: false  },
    { name: 'Message', title: 'Message Text', right: false, isDate: false, isNumber: false },
    { name: 'SMSDate', title: 'Date', right: false, isDate: true, isNumber: false, total: 0  },
    { name: 'dlr_description', title: 'Status', right: false, isDate: false, isNumber: false },
    { name: 'SMSCount', title: 'SMS Sent', right: false, isDate: false, isNumber: false}
  ];


  constructor(private dataService: DataService, public utilityService: UtilityService, private excelExporterService: ExcelExporterService) {
  }



  ngOnInit() {
  }


  getLimitNotification() {


    if (!this.selectedDateFrom || !this.selectedDateTo) {
      this.utilityService.showInfoToast('Please select date range!', 'Date range is Required');
      return;
    }

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `getLimitNotification?datefrom=${this.selectedDateFrom}&dateto=${this.selectedDateTo}&page=${this.page}&per_page=${this.per_page}`;
    this.dataService.Get(url)
      .subscribe((res) => {

        const result: ILimitNotificationWithPagination = res;
        if (result && result.data) {
          // console.log(res, result);
          this.accounts = result.data;

          this.totalRecords = result.total;
          this.total_pages = result.total_pages;
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

          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }


  ExportDataToExcel() {

    this.isInprogress = true;
    const dates = `datefrom=${this.selectedDateFrom}&dateto=${this.selectedDateTo}`;
    const url = `getLimitNotification?${dates}&page=${this.page}&per_page=${this.per_page}&export=1`;
    this.dataService.Get(url)
      .subscribe((res) => {
        const data: ILimitNotification[] = res;
        this.excelExporterService.exportAsExcelFile(data, `LimitNotification_${this.selectedDateFrom}_${this.selectedDateTo}`);
        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }


  onSearch($event) {
     this.selectedDateFrom = $event.dateFrom;
     this.selectedDateTo = $event.dateTo;
     this.per_page = $event.per_page;

     this.getLimitNotification();
   }

   onPageChange(offset) {
     this.page = (offset / this.per_page) + 1;
     this.getLimitNotification();
   }




}
