import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-top-depositors',
  templateUrl: './top-depositors.component.html',
  styleUrls: ['./top-depositors.component.scss']
})

export class TopDepositorsComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  reportTitle = '';
  reportData: any[] = [];

  reportHeader = [
    {
      name: 'PRODUCTTYPE',
      title: 'PRODUCTTYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BRANCH',
      title: 'BRANCH',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CURRENCY',
      title: 'CURRENCY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNTNUMBER',
      title: 'ACCOUNT NUMBER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CUSTOMERNAME',
      title: 'CUSTOMERNAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CLEAREDBALANCE',
      title: 'CLEAREDBALANCE',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'CUSTOMERID',
      title: 'CUSTOMER ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BVN',
      title: 'BVN',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  selectedReportOption = '50000000';

  reportTypes = [
    { code: '5000000', name: '5, 000, 000' },
    { code: '10000000', name: '10, 000, 000' },
    { code: '20000000', name: '20, 000, 000' },
    { code: '50000000', name: '50, 000, 000' }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'Top Depositors Report';
    this.getTopDepositors(this.selectedReportOption);
  }

  onSearch(entity) {
    this.per_page = entity.per_page;
    this.getTopDepositors(this.selectedReportOption);
  }

  onReportTypeChange = (entity) => {
    this.selectedReportOption = entity;
    this.getTopDepositors(this.selectedReportOption);
  }

  getTopDepositors = (amount) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl = 'top-depositors/reports?';

    const url = `${endPointUrl}amount=${amount}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        if (res.data) {
          this.reportData = res.data.data;
          this.pre_page = res.data.pre_page;
          this.next_page = res.data.next_page;
          this.totalRecords = res.data.total;
          this.total_pages = res.data.total_pages;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  onPageChange(offset) {
    this.page = offset / this.per_page + 1;
    this.getTopDepositors(this.selectedReportOption);
  }

  ExportDataToExcel() {

    this.isInprogress = true;

    this.dataService.Get(`top-depositors/download?amount=${this.selectedReportOption}&_export=1`)
      .subscribe((res) => {
        const data = res.data;
        this.excelExporterService.exportAsExcelFile(data, `top-depositors-report`);
        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }
}
