import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';
import { IWemaCollect, IWemaCollectWithPagination } from '../../shared/my-interfaces';


@Component({
  selector: 'app-wema-collect',
  templateUrl: './wema-collect.component.html',
  styleUrls: ['./wema-collect.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class WemaCollectComponent implements OnInit {


  isInprogress = false;
  showNotFoundMsg = false;
  accounts: IWemaCollect[] = [];
  searchGuid = '';

  page = 1; // current page
  per_page = 50;
  pre_page?: number; // previous
  next_page?: number;
  totalRecords = 0; // total record
  total_pages = 0;

  selectedDateFrom = '';
  selectedDateTo = '';

  reportName = 'In-Branch RevPay'; // c=CASA t=TD
  reportNameList = [{ code: 'In-Branch RevPay', name: 'In-Branch RevPay' }];

  InBranchRevPayreportHeaders = [
    {
      name: 'transactionDate',
      title: 'Trans.Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'tillaccountDebited',
      title: 'Acct. Debited',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'webguid',
      title: 'Web GUID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'transactionID',
      title: 'Entry ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'amount',
      title: 'Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'creditNarration',
      title: 'Narration',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'paymentRef',
      title: 'Payment REF',
      right: false,
      isDate: false,
      isNumber: false
    },   {
      name: 'agencyCode',
      title: 'Agency Code',
      right: false,
      isDate: false,
      isNumber: false
    },   {
      name: 'state',
      title: 'State',
      right: false,
      isDate: false,
      isNumber: false
    },   {
      name: 'revenueCode',
      title: 'Revenue Code',
      right: false,
      isDate: false,
      isNumber: false
    },   {
      name: 'accountNoCredited',
      title: 'Acct. Credited',
      right: false,
      isDate: false,
      isNumber: false
    },   {
      name: 'PayerName',
      title: 'Payer Name',
      right: false,
      isDate: false,
      isNumber: false
    },   {
      name: 'finacleResponse',
      title: 'Finacle Response',
      right: false,
      isDate: false,
      isNumber: false
    },     {
      name: 'status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(private dataService: DataService, public utilityService: UtilityService, private excelExporterService: ExcelExporterService) {
  }



  ngOnInit() {

  }

 get reportTitle() {
   return this.reportName + ' Report';
 }

 get reportHeaders() {
  return this.InBranchRevPayreportHeaders;
 }

 get reportData() {
  return this.accounts;
 }


  getWemaCollectReport(_export = 0) {

    if (!this.selectedDateFrom || !this.selectedDateTo) {
      this.utilityService.showInfoToast('Please select date range!', 'Date range is Required');
      return true;
    }


    if (this.searchGuid && this.searchGuid.match(/[a-z]/i)) {
      this.utilityService.showInfoToast('Please provide valid WEB GUID!', 'Invalid WEB GUID');
      return true;
    }

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // tslint:disable-next-line:max-line-length
    const url = `getWemaCollectReport?datefrom=${this.selectedDateFrom}&dateto=${this.selectedDateTo}&page=${this.page}&per_page=${this.per_page}&webguid=${ this.searchGuid}&export=${_export}`;
    this.dataService.Get(url)
      .subscribe((res) => {

        if ( _export === 1) {
          this.excelExporterService.exportAsExcelFile(res, `LimitNotification_${this.selectedDateFrom}_${this.selectedDateTo}`);
        } else {

        const result: IWemaCollectWithPagination = res;
        if (result && result.data) {
          // console.log(res, result);
          this.accounts = result.data;

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
          if ( _export === 0) {
          this.accounts = [];
          this.pre_page = null;
          this.next_page = null;
          this.totalRecords = 0;
          this.total_pages = 0;
          }

          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }

  onReportNameChanged($event) {
    this.reportName = $event;
  }


  onSearch($event) {
   // console.log('Search params:', JSON.stringify($event));

    this.selectedDateFrom = $event.dateFrom;
    this.selectedDateTo = $event.dateTo;
    this.searchGuid = $event.sText1;
    this.per_page = $event.per_page;

    this.getWemaCollectReport();
  }

  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;

    this.getWemaCollectReport();
  }


  onExportToExcel() {
    this.getWemaCollectReport(1);
  }


}
