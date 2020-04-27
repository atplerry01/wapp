import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/shared/service/data.service';
import { IBranch } from './../../../shared/my-interfaces';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
})

export class FixedDepositComponent implements OnInit {

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

  reportTitle = '';
  reportData: any[] = [];

  selectedBranchOption = 0;
  branches: IBranch[] = [];
  objectLists: any[] = [];
  branchLists: any[] = [];

  reportHeader = [
    {
      name: 'CUSTOMERNAME',
      title: 'CUSTOMER NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNTNO',
      title: 'ACCOUNT NO',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BRANCHNAME',
      title: 'BRANCHNAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PRODUCTNAME',
      title: 'PRODUCT NAME',
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
      name: 'CLEAREDBALANCE',
      title: 'CLEARED BALANCE',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'DATE_OPENED',
      title: 'DATE OPENED',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'LAST_TRAN_DATE',
      title: 'LAST TRANS DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'DEPOSITAMOUNT',
      title: 'DEPOSIT AMOUNT',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'INTERESTPAYABLE',
      title: 'INTEREST PAYABLE',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'INTERESTRATE',
      title: 'INTEREST RATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'MATURITYDATE',
      title: 'MATURITY DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'TENOR',
      title: 'TENOR',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TRUE_TENOR',
      title: 'TRUE TENOR',
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
    this.reportTitle = 'Fixed Deposit Report';
    this.loadBranchList();
  }

  loadBranchList() {
    this.dataService.Get('getBranchList').subscribe(
      res => {
        this.branches = res;
        this.branches.unshift({ branchcode: 0, branch: 'All Branches', zonecode: 0 });

        if (this.branches && this.branches.length > 0) {
          this.branches.forEach(p => {
            this.branchLists.push({ code: p.branchcode, name: p.branch });
          });

          this.objectLists = this.branchLists;
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  onSearch(entity) {
    if (entity.dateFrom === '' || entity.dateTo === '') {
      this.utilityService.showErrorToast('Please select date range', 'Something went wrong!');
      return;
    }

    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;
    this.per_page = entity.per_page;
    this.getFixedDeposits();
  }

  onBranchTypeChange = (entity) => {
    this.selectedBranchOption = entity;
  }

  getFixedDeposits = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'control/fixed-deposit/reports?';

    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}branchCode=${this.selectedBranchOption}&startDate=${newStartDate}&endDate=${newEndDate}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        console.log(res);

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
    this.getFixedDeposits();
  }

  ExportDataToExcel() {

    this.isInprogress = true;

    const endPointUrl = 'control/fixed-deposit/reports?';

    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}branchCode=${this.selectedBranchOption}&startDate=${newStartDate}&endDate=${newEndDate}&forceRefresh=true&_export=1`;

    this.dataService.Get(url)
      .subscribe((res) => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `fixed-deposit-report`);
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

