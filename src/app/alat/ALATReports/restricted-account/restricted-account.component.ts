


import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-restricted-account',
  templateUrl: './restricted-account.component.html',
  styleUrls: ['./restricted-account.component.scss']
})

export class RestrictedAccountComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';

  reportTitle = '';
  reportData: any[] = [];

  selectedReportOption = 'ByHQ';

  reportHeader = [
    {
      name: 'ACCT_NAME',
      title: 'AccountName',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'FORACID',
      title: 'AccountNo',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'ACCT_OPN_DATE',
      title: 'ACCT_OPN_DATE',
      right: false,
      isDate: true,
      isNumber: false
    }, {
      name: 'FREZ_CODE',
      title: 'FREZ_CODE',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'CLR_BAL_AMT',
      title: 'CLR_BAL_AMT',
      right: false,
      isDate: false,
      isNumber: true
    }, {
      name: 'LAST_FREZ_DATE',
      title: 'LAST_FREZ_DATE',
      right: false,
      isDate: true,
      isNumber: false
    }, {
      name: 'SOL_ID',
      title: 'SOL_ID',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'SOL_DESC',
      title: 'SOL_DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_STATUS',
      title: 'ACCT_STATUS',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE',
      title: 'FREZ_REASON_CODE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE_2',
      title: 'FREZ_REASON_CODE_2',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE_3',
      title: 'FREZ_REASON_CODE_3',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE_4',
      title: 'FREZ_REASON_CODE_4',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE_5',
      title: 'FREZ_REASON_CODE_5',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'Restricted ALAT Account Report';
    this.getRestrictedAccount();
  }

  onSearch() {
    this.getRestrictedAccount();
  }

  getRestrictedAccount = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'alat/restricted-account/reports?';

    const url = `${endPointUrl}page=${this.page}&per_page=${this.per_page}`;
    console.log(url);

    this.dataService.Get(url).subscribe(
      res => {
        if (res.data) {
          console.log(res.data);
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

  ExportDataToExcel() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'alat/restricted-account/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `restricted-alat-report`);
        }

        this.isInprogress = false;
      },
      error => {
        // console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  onPageChange = (offset) => {
    this.page = offset / this.per_page + 1;
    this.getRestrictedAccount();
  }
}

