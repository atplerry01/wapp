import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IFixedDeposit, IPartLiquidatedFixedDeposit } from '../../shared/my-interfaces';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';
import * as validators from '../../shared/service/validations';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
  // animations: [fadeAnimation] // register the animation
})
export class FixedDepositComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1; // current page
  per_page = 15;
  pre_page?: number; // previous
  next_page?: number;
  totalRecords = 0; // total record
  total_pages = 0;

  startDate = '';
  endDate = '';
  selectedBranchCode = '';
  accountNo = '';

  reportType = 'f'; // f=fixed dospoit p=Part-liquidated fixed deposit
  reportTypeList = [{ code: 'f', name: 'Fixed Deposit' }, { code: 'p', name: 'Part-Liquated Fixed Deposit' }];

  dateType = 'mdate';
  dateTypeList = [
    { code: 'mdate', name: 'Maturity Date' },
    { code: 'ddate', name: 'Deal Date' },
    { code: 'pldate', name: 'Part Liquidated Date' }
  ];

  fixedDepositData: IFixedDeposit[] = [];
  partLqFixedDepositData: IPartLiquidatedFixedDeposit[] = [];

  reportFixedDepositHeaders = [
    {
      name: 'BRANCHNAME',
      title: 'Branch',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PRODUCTNAME',
      title: 'Product',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNTNO',
      title: 'Account No.',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CUSTOMERNAME',
      title: 'Customer Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TENOR',
      title: 'Tenor',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DEPOSIT_PERIOD_MTHS',
      title: 'Period Month',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TRUE_TENOR',
      title: 'True Tenor',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DATEOPENED',
      title: 'Date Opened',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'MATURITYDATE',
      title: 'Maturity Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'ACCT_CRNCY_CODE',
      title: 'Currency',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DEPOSITAMOUNT',
      title: 'Deposit Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'INTERESTRATE',
      title: 'Int.Rate',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CLEAREDBALANCE',
      title: 'Cleared Balance',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'INTERESTPAYABLE',
      title: 'Interest payable',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'LAST_TRAN_DATE',
      title: 'Last Tran.Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'DepositStatus',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  reportPartLqFixedDepositHeaders = [
    {
      name: 'BRANCHCODE',
      title: 'SOL_ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BRANCHNAME',
      title: 'Branch Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNTNO',
      title: 'Account No.',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_NAME',
      title: 'Account Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_OFFICER',
      title: 'Account Officer',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PRINCIPAL_AMT',
      title: 'Principal Amt.',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'DEAL_DATE',
      title: 'Deal Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'MATURITY_DATE',
      title: 'Maturity Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'TENOR',
      title: 'Tenor',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'INTERESTRATE',
      title: 'Int.Rate',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PART_LIQUIDATED_DATE',
      title: 'Part Liquidated Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'PART_LIQUIDATED_AMT',
      title: 'Part Liquidated Amt.',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'BAL_AFTER_PART_LIQUIDATION',
      title: 'BAL. After Part Liq.',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'NEW_RATE',
      title: 'New Rate',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'VERIFIER',
      title: 'Verifier',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'REMAINING_TENOR',
      title: 'Remaining Tenor After Part Liq.',
      right: true,
      isDate: false,
      isNumber: false
    }
  ];



  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private excelExport: ExcelExporterService
  ) {}

  ngOnInit() {}

  get reportTitle() {
    return this.reportType === 'f' ? 'Fixed Deposit Report' : 'Part-Liquated Fixed Deposit Report';
  }

  get reportHeaders() {
    return this.reportType === 'f' ? this.reportFixedDepositHeaders : this.reportPartLqFixedDepositHeaders;
  }

  get reportData() {
    return this.reportType === 'f' ? this.fixedDepositData : this.partLqFixedDepositData;
  }

  getUrl(exportToExcel) {
    const dateParam = `startDate=${this.startDate}&endDate=${this.endDate}`;
    const pageParam = `page=${this.page}&per_page=${this.per_page}`;
    const param = `${dateParam}&accountNo=${this.accountNo}&branchCode=${this.selectedBranchCode}&${pageParam}&export=${exportToExcel}`;
    const url = this.reportType === 'f' ? `getFixedDeposit?${param}` : `getPartLiquidatedFixedDeposit?dateType=${this.dateType}&${param}`;

    return url;
  }

  getReportData(exportToExcel = 0) {

    if (exportToExcel === 0) {
       this.fixedDepositData = [];
    }

    if (this.accountNo && !validators.isValidAccountNo(this.accountNo)) {
      this.utilityService.showErrorToast('Please enter valid account number', 'Invalid Account Number');
      return;
    }
    if (this.selectedBranchCode && !validators.isValidBranchCode(this.selectedBranchCode)) {
      this.utilityService.showErrorToast('Please select valid branch', 'Invalid Branch Code');
      return;
    }

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    this.dataService.Get(this.getUrl(exportToExcel))
      .subscribe((res) => {

        if (exportToExcel === 1) {
          this.excelExport.exportAsExcelFile(res, this.reportType === 'f' ? 'fixidDeposit_Report' : 'partLqFixedDeposit_Report');
        } else {

        if (res && res.data.length) {
          // console.log(res, result);
          if (this.reportType === 'f') {
            this.fixedDepositData = res.data;
          } else {
            this.partLqFixedDepositData = res.data;
          }
          this.pre_page = res.pre_page;
          this.next_page = res.next_page;
          this.totalRecords = res.total;
          this.total_pages = res.total_pages;
        } else {
          this.showNotFoundMsg = true;
        }
      }

        this.isInprogress = false;
      },
        error => {
           // console.log(error);
           if (exportToExcel === 0) {
           this.fixedDepositData = [];
           this.partLqFixedDepositData = [];
           this.pre_page = null;
           this.next_page = null;
           this.totalRecords = 0;
           }

          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }


  onReportTypeChanged($event) {
    this.reportType = $event;
  }

  onDateTypeChanged($event) {
    this.dateType = $event;
  }


  onSearch($event) {
   // console.log('Search params:', JSON.stringify($event));

    this.accountNo = $event.sText1;
    this.startDate = $event.dateFrom;
    this.endDate = $event.dateTo;
    this.selectedBranchCode = $event.branchCode;
    this.per_page = $event.per_page;

    this.getReportData();
  }

  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;
    console.log('page: ', this.page);
    this.getReportData();
  }


  onExportToExcel() {
    this.getReportData(1);
  }
}
