import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';
import { IWemaCollect, IWemaCollectWithPagination } from '../../shared/my-interfaces';

@Component({
  selector: 'app-confidential',
  templateUrl: './confidential.component.html',
  styleUrls: ['./confidential.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class ConfidentialComponent implements OnInit {


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

  reportName = 'Confidentiality Report'; // c=CASA t=TD
  reportNameList = [
    { code: 'Declared Confidentiality', name: 'Declared Confidentiality' }
  ];

  tableHeaders = [
    {
      name: 'Id',
      title: 'Id',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'empNo',
      title: 'Employee No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'email',
      title: 'Email',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'empName',
      title: 'Employee Name',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'department',
      title: 'Department',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'grade',
      title: 'Grade',
      right: true,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService) {
  }

  ngOnInit() {
    this.getConfidentiality();
  }

 get reportTitle() {
   return this.reportName + ' Report';
 }

 get reportHeaders() {
  return this.tableHeaders;
 }

 get reportData() {
  return this.accounts;
 }


  getConfidentiality(_export = 0) {

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // tslint:disable-next-line:max-line-length
    const url = `getConfidentialReport?page=${this.page}&per_page=${this.per_page}&export=${_export}`;
    console.log(url);
    this.dataService.Get(url)
      .subscribe((res) => {
        if ( _export === 1) {
          this.excelExporterService.exportAsExcelFile(res, `Confidentiality_${this.selectedDateFrom}_${this.selectedDateTo}`);
        } else {

        const result: IWemaCollectWithPagination = res;
        if (result && result.data) {
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
    this.selectedDateFrom = $event.dateFrom;
    this.selectedDateTo = $event.dateTo;
    this.searchGuid = $event.sText1;
    this.per_page = $event.per_page;

    this.getConfidentiality();
  }

  onPageChange(offset) {
    console.log('incoming offset', offset);
    this.page = (offset / this.per_page) + 1;

    console.log(this.page);
    console.log(offset);
    this.getConfidentiality();
  }


  onExportToExcel() {
    this.getConfidentiality(1);
  }


}
