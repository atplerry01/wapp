
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-lien-account',
  templateUrl: './lien-account.component.html',
  styleUrls: ['./lien-account.component.scss']
})

export class LienAccountComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  accountNumber = '';
  cif = '';

  reportTitle = '';
  reportData: any[] = [];

  // selectedBranchOption = 0;
  // branches: IBranch[] = [];
  // objectLists: any[] = [];
  // branchLists: any[] = [];

  reportHeader = [
    {
      name: 'ACCT_NO',
      title: 'ACCOUNT NUMBER',
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
      name: 'CIF_ID',
      title: 'CIF ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'LIEN_AMT',
      title: 'LIEN AMT',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FUTURE_ULIEN_AMT',
      title: 'FUTURE ULIEN AMT',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'LIEN_REMARKS',
      title: 'LIEN REMARKS',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'MODULE_ID',
      title: 'MODULE ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'MODULE_TYPE',
      title: 'MODULE TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'LIEN_REASON_CODE',
      title: 'LIEN REASON CODE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'LIEN_REASON_DESC',
      title: 'LIEN REASON DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'LIEN_START_DATE',
      title: 'LIEN START DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'LIEN_EXPIRY_DATE',
      title: 'LIEN EXPIRY DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'REQUESTED_BY_DESC',
      title: 'REQUESTED BY DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'REQUEST_DEPARTMENT',
      title: 'REQUEST DEPARTMENT',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'USER_ID',
      title: 'USER_ID',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = 'Account Lien Report';
  }

  onSearch(entity) {
    this.accountNumber = entity.sText1;
    this.cif = entity.sText2;
    this.getAccountFreezeReports();
  }

  getAccountFreezeReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // bcs-reports/account-freeze/reports
    const endPointUrl = 'alat/account-lien/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&accountNumber=${this.accountNumber}&cif=${this.cif}&page=${this.page}&per_page=${this.per_page}`;
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
    this.getAccountFreezeReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = 'alat/account-lien/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&accountNumber=${this.accountNumber}&cif=${this.cif}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `account-lien-report`
          );
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
}
