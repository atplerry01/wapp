import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import {
  AccountProfitabilityNo,
  AccountProfitabilityAssets,
  AccountProfitabilityLiabilities
} from '../../shared/my-interfaces';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-perfmgt',
  templateUrl: './perfmgt.component.html',
  styleUrls: ['./perfmgt.component.scss']
  // animations: [fadeAnimation] // register the animation
})
export class PerfmgtComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  islowerAccess = false;
  selectedCatCode = 1; // 0===account number, 1 === branch
  accNoPlaceholder = '';
  showBranchList = true;

  categoryList = [{ code: 0, name: 'Account No' }, { code: 1, name: 'Branch' }];
  reportType = 'a'; // a=asset l=liabilities
  // reportTypeList = [{ code: 'a', name: 'Assets' }, { code: 'l', name: 'Liabilities' }];
  reportTypeList = [{ code: 'a', name: 'Assets' }];
  selectedTopCust = 't-20';
  topCustList = [
    { code: 't-10', name: 'Top 10' },
    { code: 't-20', name: 'Top 20' },
    { code: 't-50', name: 'Top 50' },
    { code: 't-100', name: 'Top 100' },
    { code: 'b-10', name: 'Bottom 10' },
    { code: 'b-20', name: 'Bottom 20' },
    { code: 'b-50', name: 'Bottom 50' },
    { code: 'b-100', name: 'Bottom 100' }
  ];

  data: any[] = [];
  reportByAccNo: AccountProfitabilityNo[] = [];
  reportByAssets: AccountProfitabilityAssets[] = [];
  reportByLiabilities: AccountProfitabilityLiabilities[] = [];

  reportByAccNoHeaders = [
    {
      name: 'AccountNo',
      title: 'Account No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AccountName',
      title: 'Account Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Product',
      title: 'Product',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Balance',
      title: 'Balance',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TurnoverDebit',
      title: 'Debit Turnover',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TurnoverCredit',
      title: 'Credit Turnor',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'AvgBalanceCr',
      title: 'Avg.Balance.Cr',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'AvgBalanceDr',
      title: 'Avg.Balance.Dr',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IntRate',
      title: 'Int. Rate',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'LiquidityRatio',
      title: 'Liquidity Ratio',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'CashReserve',
      title: 'Cash Reserve',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'PoolSource',
      title: 'Pool Sources/uses',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IncomeOnLiquidity',
      title: 'Income On Liquidity',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'PoolCredit',
      title: 'Pool Credit/Charge',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IntIncome',
      title: 'Int. Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IntExpense',
      title: 'Int. Expense',
      right: true,
      isDate: false,
      isNumber: true
    },
    { name: 'NRFF', title: 'NRFF', right: true, isDate: false, isNumber: true },
    {
      name: 'AccMaintFee',
      title: 'Acc.Maint.Fee',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FeeIncome',
      title: 'Fee Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TotalIncome',
      title: 'Total Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TransferPrice',
      title: 'Transfer Price (%)',
      right: true,
      isDate: false,
      isNumber: false
    },
    { name: 'ROA', title: 'Effective Yield(%)', right: true, isDate: false, isNumber: true },
    {
      name: 'AccountMgr',
      title: 'Account Mgr.',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  reportByAssetsHeaders = [
    {
      name: 'AccountNo',
      title: 'Account No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AccountName',
      title: 'Account Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Product',
      title: 'Product',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Balance',
      title: 'Oustanding Balance',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TurnoverDebit',
      title: 'Debit Turnover',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TurnoverCredit',
      title: 'Credit Turnor',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'AvgBalanceDr',
      title: 'Avg. Debit Balance',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'AvgBalanceCr',
      title: 'Avg.Balance.Cr',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IntRate',
      title: 'Effective Int. Rate',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IntIncome',
      title: 'Int. Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TransferPrice',
      title: 'Transfer Price (%)',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PoolCharge',
      title: 'Pool Charge',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'NRFF',
      title: 'NRFF',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'AccMaintFee',
      title: 'Acc.Maint.Fee',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FeeIncome',
      title: 'Fee Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TotalIncome',
      title: 'Total Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    { name: 'EffectiveYield', title: 'Effective Yield(%)', right: true, isDate: false, isNumber: false },
    {
      name: 'AccountMgr',
      title: 'Account Mgr.',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  reportByLiabilitiesHeaders = [
    {
      name: 'AccountNo',
      title: 'Account No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AccountName',
      title: 'Account Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Product',
      title: 'Product',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Balance',
      title: 'Actual Bal.',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TurnoverDebit',
      title: 'Debit Turnover',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TurnoverCredit',
      title: 'Credit Turnor',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'AvgBalanceCr',
      title: 'AvgBalanceCr',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IntRate',
      title: 'Int. Rate',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'LiquidityRatio',
      title: 'Liquidity Ratio(%)',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'CashReserve',
      title: 'Cash Reserve(%)',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'PoolContribution',
      title: 'Pool Contribution',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IncomeOnLiquidity',
      title: 'Income On Liquidity',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'PoolCredit',
      title: 'Pool Credit/Charge',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FloatIncome',
      title: 'Float Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'IntExpense',
      title: 'Int. Expense',
      right: true,
      isDate: false,
      isNumber: true
    },
    { name: 'NRFF', title: 'NRFF', right: true, isDate: false, isNumber: true },
    {
      name: 'AccMaintFee',
      title: 'Acc.Maint.Fee',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FeeIncome',
      title: 'Fee Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TotalIncome',
      title: 'Total Income',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'AccountMgr',
      title: 'Account Mgr.',
      right: false,
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

  get reportHeaders() {
    if (this.selectedCatCode === 0) {
      return this.reportByAccNoHeaders;
    } else {
      if (this.reportType === 'a') {
        // asset
        return this.reportByAssetsHeaders;
      } else {
        // liabilities
        return this.reportByLiabilitiesHeaders;
      }
    }
  }

  get reportData() {
    if (this.selectedCatCode === 0) {
      return this.reportByAccNo; // search by account number
    } else {
      if (this.reportType === 'a') {
        return this.reportByAssets; // asset
      } else {
        return this.reportByLiabilities; // liabilities
      }
    }
  }


  getAccountProfitability(brncode, accno, monthfrom: number, monthto: number) {
    if ( isNaN(monthfrom) || isNaN(monthto)) {
      this.utilityService.showInfoToast(
        'Please select valid date range!',
        'Valid Date Range Required'
      );
      return;
    }
    if (this.selectedCatCode === 0 && (!accno || accno.length !== 10)) {
      this.utilityService.showInfoToast(
        'Please provide account number!',
        'Account Number Required'
      );
      return;
    } else if (this.selectedCatCode === 1 && !brncode && !this.islowerAccess) {
      this.utilityService.showInfoToast(
        'Please select branch!',
        'Branch Required'
      );
      return;
    }

    this.data = [];
    this.reportByAccNo = [];
    this.reportByAssets = [];
    this.reportByLiabilities = [];

    this.isInprogress = true;
    const val = this.selectedCatCode === 0 ? accno : brncode;
    const param = `searchterm=${
      this.selectedCatCode
    }&value=${val}&monthfrom=${monthfrom}&monthto=${monthto}&type=${
      this.reportType
    }`;
    this.dataService.Get(`getAccountProfitability?${param}`).subscribe(
      res => {
        this.showNotFoundMsg = res.length > 0 ? false : true;
        this.data = res;
        // console.log('data1...', JSON.stringify(this.data));
        this.displayReport(this.data);

        this.isInprogress = false;
      },
      error => {
        // console.log(error);
        this.showNotFoundMsg = true;
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  displayReport(data, _selectedTopCust = 't-20') {

    if (this.selectedCatCode === 0) { // account number search
      this.reportByAccNo = data;
      return;
    }

    this.selectedTopCust = _selectedTopCust;
    const selA = _selectedTopCust.split('-');
    const isTop = selA[0] === 't' ? true : false;

    // let _data = [];
    // if (isTop) {
    //   _data = data.slice(0, Number(selA[1]));
    // } else {
    //   _data = data.slice(data.length - (Number(selA[1]) + 1), data.length - 1);
    // }

    if (this.reportType === 'a') {  // asset
     const assData:  AccountProfitabilityAssets[] = data;
      const finalAssetData = assData.filter(x => x.Type === 'LAA' || (x.Type === 'ODA' && x.AvgBalanceCr < (x.AvgBalanceDr * -1)));
      this.reportByAssets =  this.sliceData(finalAssetData, selA, isTop);
    } else { // liabilities
      this.reportByLiabilities = this.sliceData(data, selA, isTop);  // _data;
    }
  }

  sliceData(data, selA: any, isTop: boolean): any {
    if (isTop) {
     return data.slice(0, Number(selA[1]));
    } else {
      return data.slice(data.length - (Number(selA[1]) + 1), data.length - 1);
    }
  }

  onMainCateoryChange($event) {
    this.selectedCatCode = Number($event);

    if (this.selectedCatCode === 0) {
      this.accNoPlaceholder = 'Account no..';
      this.showBranchList = false;
    } else {
      this.accNoPlaceholder = '';
      this.showBranchList = true;
    }
  }

  onReportTypeChanged($event) {
    this.reportType = $event;
  }

  onTopCustomerChanged($event) {
    if (this.selectedTopCust === $event) {
      return;
    }

    this.displayReport(this.data, $event);
  }

  getMonthNumber(dateValue) {
    const d = new Date(dateValue);
    return d.getMonth() + 1;
  }

  onSearch($event) {
   // console.log('Search params:', JSON.stringify($event));

    const monthfrom = this.getMonthNumber($event.dateFrom);
    const monthto = this.getMonthNumber($event.dateTo);
    let brncode = '';
    let accno = '';
    if (this.selectedCatCode === 0) {
      accno = $event.sText1;
    } else {
      // branch
      this.islowerAccess = $event.lowerAccess;
     if (this.islowerAccess) {
      brncode = '000';
     } else {
      brncode = $event.branchCode;
     }
    }

    this.getAccountProfitability(brncode, accno, monthfrom, monthto);
  }
  onExportToExcel() {

 let reportName = 'AccountProfitablity_';
    if (this.selectedCatCode === 0) {
      reportName = reportName + 'ByAccountNo'; // search by account number
    } else {
      const suffix =  this.selectedTopCust.split('-')[0] === 't' ? 'TopCustomers' : 'BottomCustomers';
      if (this.reportType === 'a') {
        reportName = reportName + 'ByAsset_' +  suffix;
      } else {
        reportName = reportName + 'ByLiabilities_' + suffix;
      }
    }

    this.excelExport.exportAsExcelFile(this.reportData, reportName);
  }
}
