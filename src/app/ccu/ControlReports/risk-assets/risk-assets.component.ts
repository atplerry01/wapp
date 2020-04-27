import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-risk-assets',
  templateUrl: './risk-assets.component.html',
  styleUrls: ['./risk-assets.component.scss']
})

export class RiskAssetsComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';
  newStartDate = '';
  newEndDate = '';

  reportTitle = '';
  reportData: any[] = [];

  reportHeader = [
    {
      name: 'ACCT_NAME',
      title: 'ACCOUNT NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FORACID',
      title: 'ACCOUNT NO',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SOL_DESC',
      title: 'SOL DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CLASSIFICATION',
      title: 'CLASSIFICATION',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_CRNCY_CODE',
      title: 'CURRENCY CODE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'LAST_TRANSACTION_AMOUNT',
      title: 'LAST_TRANSACTION_AMOUNT',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'LAST_ANY_TRAN_DATE',
      title: 'LAST_ANY_TRAN_DATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'OD_AMT',
      title: 'OD_AMT',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'OVERLIMIT',
      title: 'OVERLIMIT',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PROVISION',
      title: 'PROVISION',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'OD_AMT',
      title: 'OD_AMT',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  selectedReportOption = 0;

  reportTypes = [
    { code: 0, name: 'ODA Reports' },
    { code: 1, name: 'Specialized Reports' },
    { code: 2, name: 'Non Speciliazed Reports' },
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'Risk Assets Report';
  }

  onSearch(entity) {
    this.per_page = entity.per_page;

    if (entity.dateFrom === '') {
      this.newStartDate = 'all';
    } else {
      this.startDate = entity.dateFrom;
      this.endDate = entity.dateTo;

      this.newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
      this.newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    }

    this.getRiskAssets();
  }

  onReportTypeChange = (entity) => {
    this.selectedReportOption = entity;
  }

  getRiskAssets = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'control/risk-assets/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}reportType=${this.selectedReportOption}&startDate=${this.newStartDate}&endDate=${this.newEndDate}&page=${this.page}&per_page=${this.per_page}`;

    console.log(url);

    this.dataService.Get(url).subscribe(
      res => {
        console.log(res.data);

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
    this.getRiskAssets();
  }

  ExportDataToExcel() {

    this.isInprogress = true;

    const endPointUrl = 'control/risk-assets/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}reportType=${this.selectedReportOption}&startDate=${this.newStartDate}&endDate=${this.newEndDate}&forceRefresh=true&_export=1`;

    this.dataService.Get(url)
      .subscribe((res) => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `risk-assets-report`);
        }

        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }
}
