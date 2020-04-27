import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-freeze-account',
  templateUrl: './freeze-account.component.html',
  styleUrls: ['./freeze-account.component.scss']
})

export class FreezeAccountComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  accountNumber = '';

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
      name: 'FREZ_CODE',
      title: 'FREEZE CODE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_TYPE',
      title: 'ACCOUNT TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_STATUS',
      title: 'ACCOUNT STATUS',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZE_TYPE',
      title: 'FREEZE TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE1',
      title: 'FREEZE REASON CODE1',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREEZE_RMKS',
      title: 'FREEZE RMKS',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE_2',
      title: 'FREEZE REASON CODE 2',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FREEZE_RMKS2',
      title: 'FREEZE RMKS2',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FREZ_REASON_CODE_3',
      title: 'FREEZE REASON CODE 3',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FREEZE_RMKS3',
      title: 'FREEZE RMKS3',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE_4',
      title: 'FREEZE REASON CODE 4',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FREEZE_RMKS4',
      title: 'FREEZE RMKS4',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREZ_REASON_CODE_5',
      title: 'FREEZE REASON CODE 5',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREEZE_RMKS5',
      title: 'FREEZE RMKS5',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'LAST_FREZ_DATE',
      title: 'LAST FREEZE DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'LAST_UNFREZ_DATE',
      title: 'LAST UNFREEZE DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'BAL_ON_FREZ_DATE',
      title: 'BAL ON FREEZE DATE',
      right: false,
      isDate: false,
      isNumber: true
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = 'Account Freeze Report';
  }

  onSearch(entity) {
    this.accountNumber = entity.sText1;
    this.getAccountLienReports();
  }

  getAccountLienReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // bcs-reports/account-lien/reports
    const endPointUrl = 'alat/account-freeze/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&accountNumber=${this.accountNumber}&page=${this.page}&per_page=${this.per_page}`;
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
    this.getAccountLienReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = 'alat/account-freeze/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&accountNumber=${this.accountNumber}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `Account freeze`);
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
