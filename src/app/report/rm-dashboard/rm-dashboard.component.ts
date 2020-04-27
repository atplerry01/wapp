import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IRMDashboardDetails, IRMUnfundedAccountDetails, IRMAccountStatusDetails,
  IRMAccountReactivationDetail } from '../../shared/my-interfaces';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';


@Component({
  selector: 'app-rm-dashboard',
  templateUrl: './rm-dashboard.component.html',
  styleUrls: ['./rm-dashboard.component.scss']
  // animations: [fadeAnimation] // register the animation
})
export class RMDashboardComponent implements OnInit {
  isInprogress = false;
  isInprogress2 = false;
  showNotFoundMsg = false;
  showNotFoundMsg2 = false;

  myAccess: any = {};

  showTextFilter = false;

  page = 1; // current page
  per_page = 15;
  totalRecords = 0; // total record
  total_pages = 0;

  staffId = '';
  showSearch = false;
  accNoPlaceholder = '';
  dashboardData: any[] = [];
  accountsOpenedData: any[] = [];
  accountStatusData: any[] = [];
  reactivatedAccountData: any[] = [];

   rmDashboardColumnSelected = '';
   nonFinAccOpenColumnSelected = '';
   nonFinAccStatusColumnSelected = '';
   nonFinReactivatedAccColumnSelected = '';

  RMDashboardDetails: IRMDashboardDetails[] = [];
  RMDashboardDetailsFiltered: IRMDashboardDetails[] = [];
  RMUnfundedAccountDetails: IRMUnfundedAccountDetails[] = [];
  RMUnfundedAccountDetailsFiltered: IRMUnfundedAccountDetails[] = [];
  RMAccountStatusDetails: IRMAccountStatusDetails[] = [];
  RMAccountStatusDetailsFiltered: IRMAccountStatusDetails[] = [];
  RMAccountReactivationDetail: IRMAccountReactivationDetail[] = [];
  RMAccountReactivationDetailFiltered: IRMAccountReactivationDetail[] = [];
  tableClicked = '';
  isUnfundedAccount = false;

  RMDashboardDetailReportTitle = '';

  reportDashboardHeader = [
    {
      name: 'TOTAL_DEPOSIT',
      title: 'Total Deposit',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TOTAL_LOAN',
      title: 'Total Loan',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'TOTAL_ACCTS',
      title: 'Total Accounts',
      right: true,
      isDate: false,
      isNumber: false
    }
  ];

  reportAccountsOpenedHeader = [
    {
      name: 'TOTAL_ACCTS',
      title: 'All Accounts',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TOTAL_ACCTS_YEAR',
      title: 'Accounts Opened In Current Year',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TOTAL_ACCTS_5K_AVG',
      title: 'ACCOUNTS OPENED IN CURRENT YEAR WITH 5000 AVERAGE BAL',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'UNFUNDED_ACCTS',
      title: 'Unfunded Accounts',
      right: true,
      isDate: false,
      isNumber: false
    }
  ];

  reportAccountStatusHeader = [
    {
      name: 'ACTIVE_ACCT',
      title: 'Active',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'INACTIVE_ACCT',
      title: 'Inactive',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DORMANT_ACCT',
      title: 'Dormant',
      right: true,
      isDate: false,
      isNumber: false
    }
  ];

  reportReactivatedAccountHeader = [
    {
      name: 'REACTIVATED_ACCTS_YEAR',
      title: 'Current Year',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'REACTIVATED_ACCTS_MONTH',
      title: 'Current Month',
      right: true,
      isDate: false,
      isNumber: false
    }
  ];

  reportDashboardDetailsHeader = [
    {
      name: 'BRANCH',
      title: 'Branch',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_NUMBER',
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
      name: 'PRODUCT_NAME',
      title: 'Product',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_OPN_DATE',
      title: 'Date Opened',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'TOTAL',
      title: 'Balance',
      right: true,
      isDate: false,
      isNumber: true
    }
  ];


  reportNonFinUnfunedAccountDetailsHeader = [
    {
      name: 'ACCT_NAME',
      title: 'Account Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_NUMBER',
      title: 'Account No.',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_OPN_DATE',
      title: 'Opened Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'BALANCE',
      title: 'Balance',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'CURRENCY_TYPE',
      title: 'Currency',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PREFERREDPHONE',
      title: 'Phone',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EMAIL',
      title: 'Email',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ADDRESS_LINE1',
      title: 'Address',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  reportNonFinAccStatusDetailsHeader = [
    {
      name: 'BRANCH',
      title: 'Branch',
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
      name: 'ACCT_NUMBER',
      title: 'Account No.',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PRODUCT_NAME',
      title: 'Product',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BALANCE',
      title: 'Balance',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'ACCT_STATUS',
      title: 'Account Status',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_STATUS_DATE',
      title: 'Status Date',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];


  reportNonFinAccReactionDetailsHeader = [
    {
      name: 'BRANCH',
      title: 'Branch',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_NO',
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
      name: 'PRODUCT_NAME',
      title: 'Product',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_OPN_DATE',
      title: 'Date Opened',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'BALANCE',
      title: 'Balance',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'ACCT_CRNCY_CODE',
      title: 'Currency',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PREFERREDPHONE',
      title: 'Phone',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EMAIL',
      title: 'Email',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ADDRESS_LINE1',
      title: 'Address',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_MGR_USER_ID',
      title: 'Acc. Mgr.',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.getRMDashboard(this.staffId);
    this.getRMNonFinancials(this.staffId);
   // this.callGetRMNonFinancial();
  }

  getMyAccess($event) {
    this.myAccess = $event;
    setTimeout(() => {
      if (this.myAccess.key && this.myAccess.key === 'G') {
        this.showSearch = true;
        this.accNoPlaceholder = 'Staff ID';
      }
    }, 1000);

  }

get reportDashboardNonfinDetailsHeader() {
 return this.isUnfundedAccount === true ? this.reportNonFinUnfunedAccountDetailsHeader : this.reportDashboardDetailsHeader;
}

get reportDashboardNonfinDetailsFilteredData() {
  return this.isUnfundedAccount === true ? this.RMUnfundedAccountDetailsFiltered : this.RMDashboardDetailsFiltered;
 }

 get reportDashboardNonfinDetailsData() {
  return this.isUnfundedAccount === true ? this.RMUnfundedAccountDetails : this.RMDashboardDetails;
 }

  getRMDashboard(staffId?: string) {

    this.dashboardData = [];
    this.isInprogress = true;

    this.dataService.Get(`getRMDashboard?userId=${staffId}`).subscribe(
      res => {
        this.showNotFoundMsg = res.length > 0 ? false : true;

        const TOTAL_DEPOSIT = res[0][0].TOTAL_DEPOSIT;
        const TOTAL_LOAN = res[1][0].TOTAL_LOAN;
        const TOTAL_ACCTS = res[2][0].TOTAL_ACCTS;

        this.dashboardData = [
          {'TOTAL_DEPOSIT': TOTAL_DEPOSIT, 'TOTAL_LOAN': TOTAL_LOAN, 'TOTAL_ACCTS': TOTAL_ACCTS}
        ];

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

  getRMDashboardDetail(type: string, _export = 0, filterText = '' ) {

    if (this.isInprogress) {
      this.utilityService.showInfoToast('Please for your previous request to complete', 'System Busy!');
      return;
    }

    if (!this.showTextFilter) {
    this.RMDDTopClose();
    }

    this.isUnfundedAccount = false;
    this.isInprogress = true;

    const pagParam = `page=${this.page}&per_page=${this.per_page}&_export=${_export}&filterText=${filterText}`;

    this.dataService.Get(`getRMnonfinancialdetails?type=${type}&userId=${this.staffId}&${pagParam}`).subscribe(
      res => {

        if ( _export === 1) {
          this.excelExporterService.exportAsExcelFile(res, `RMReport_${this.RMDashboardDetailReportTitle}`);
          this.isInprogress = false;
          return;
        }

        if ( res && res.data) {

          this.showNotFoundMsg = res.data.length > 0 ? false : true;
          if (res.data.length > 10) {
          this.showTextFilter = true;
          }

        const data = res.data;
        this.totalRecords = res.total;
        this.total_pages = res.total_pages;

        if ( this.tableClicked === 'nonfinreactedacc') {
          this.RMAccountReactivationDetail = data;
          this.RMAccountReactivationDetail.sort(this.utilityService.compareValues('BALANCE', 'desc'));
          this.RMAccountReactivationDetailFiltered = this.RMAccountReactivationDetail;
        } else if ( this.tableClicked === 'nonfinaccstatus') {
          this.RMAccountStatusDetails = data;
          this.RMAccountStatusDetails.sort(this.utilityService.compareValues('BALANCE', 'desc'));
          this.RMAccountStatusDetailsFiltered = this.RMAccountStatusDetails;
        } else if ( type === 'ua') {
          this.isUnfundedAccount = true;
          this.RMUnfundedAccountDetails = data;
          this.RMUnfundedAccountDetails.sort(this.utilityService.compareValues('BALANCE', 'desc'));
          this.RMUnfundedAccountDetailsFiltered = this.RMUnfundedAccountDetails;
        } else {
          this.RMDashboardDetails = data;
          this.RMDashboardDetails.sort(this.utilityService.compareValues('TOTAL', 'desc'));
          this.RMDashboardDetailsFiltered = this.RMDashboardDetails;
        }

      }

        this.isInprogress = false;
      },
      error => {
        // console.log(error);
        if ( _export === 0) {
          this.totalRecords = 0;
          this.total_pages = 0;
          }

        this.showNotFoundMsg = true;
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }



  onRMDFilterTextChange($event) {
    setTimeout(() => {
      this.page = 1;
      this.showTextFilter = true;

      if ( this.isUnfundedAccount) {
        this.getRMDashboardDetail(this.nonFinAccOpenColumnSelected, 0, $event);
      } else {
     this.getRMDashboardDetail(this.rmDashboardColumnSelected, 0, $event);
      }
    }, 1000);
  }

  onRMAccStatusFilterTextChange($event) {
    setTimeout(() => {
      this.page = 1;
      this.showTextFilter = true;
      this.getRMDashboardDetail(this.nonFinAccStatusColumnSelected, 0, $event);
    }, 1000);
  }

  onRMAccReactionFilterTextChange($event) {
    setTimeout(() => {
      this.page = 1;
      this.showTextFilter = true;
      this.getRMDashboardDetail(this.nonFinReactivatedAccColumnSelected, 0, $event);
    }, 1000);
  }

  RMDDTopClose() {
    this.showTextFilter = false;
    this.RMDashboardDetails = [];
    this.RMDashboardDetailsFiltered = [];
    this.RMUnfundedAccountDetails  = [];
    this.RMUnfundedAccountDetailsFiltered = [];
    this.RMAccountStatusDetails = [];
    this.RMAccountStatusDetailsFiltered = [];
    this.RMAccountReactivationDetail = [];
    this.RMAccountReactivationDetailFiltered = [];
  }

  getRMNonFinancials(staffId?: string) {

    this.accountsOpenedData = [];
    this.accountStatusData = [];
    this.reactivatedAccountData = [];

    this.isInprogress2 = true;

    this.dataService.Get(`getRMNonFinancials?userId=${staffId}`).subscribe(
      res => {
        this.showNotFoundMsg2 = res.length > 0 ? false : true;

        // Account opened/Introduced
        const TOTAL_ACCTS = res[0][0].TOTAL_ACCTS;
        const TOTAL_ACCTS_YEAR = res[1][0].TOTAL_ACCTS;
        const TOTAL_ACCTS_5K_AVG = res[2][0].TOTAL_ACCTS_5K_AVG;
        const UNFUNDED_ACCTS = res[3][0].UNFUNDED_ACCTS;

        // Account Status
        const ACTIVE_ACCT = res[4][0].ACCT_STATUS;
        const INACTIVE_ACCT = res[5][0].ACCT_STATUS;
        const DORMANT_ACCT = res[6][0].ACCT_STATUS;

        // Reactivated Accounts
        const REACTIVATED_ACCTS_YEAR = res[7][0].REACTIVATED_ACCTS;
        const REACTIVATED_ACCTS_MONTH = res[8][0].REACTIVATED_ACCTS;


        this.accountsOpenedData = [
          {
            'TOTAL_ACCTS': TOTAL_ACCTS,
            'TOTAL_ACCTS_YEAR': TOTAL_ACCTS_YEAR,
            'TOTAL_ACCTS_5K_AVG': TOTAL_ACCTS_5K_AVG,
            'UNFUNDED_ACCTS': UNFUNDED_ACCTS
          }
        ];
        this.accountStatusData = [
          {
            'ACTIVE_ACCT': ACTIVE_ACCT,
            'INACTIVE_ACCT': INACTIVE_ACCT,
            'DORMANT_ACCT': DORMANT_ACCT
          }
        ];
        this.reactivatedAccountData = [
          {
            'REACTIVATED_ACCTS_YEAR': REACTIVATED_ACCTS_YEAR,
            'REACTIVATED_ACCTS_MONTH': REACTIVATED_ACCTS_MONTH
          }
        ];

        this.isInprogress2 = false;
      },
      error => {
        // console.log(error);
        this.showNotFoundMsg2 = true;
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress2 = false;
      }
    );
  }

  // getRMNonFinancials_URL(type: string) {
  //   switch (type) {
  //     case 'all_account':
  //     return 'getRMNonFinancials_all_account';
  //     case 'all_account_this_year':
  //     return 'getRMNonFinancials_all_account_this_year';
  //     case 'all_account_5k':
  //     return 'getRMNonFinancials_all_account_5k';
  //     case 'unfunded_account':
  //     return 'getRMNonFinancials_unfunded_account';
  //     case 'active_account':
  //     return 'getRMNonFinancials_active_account';
  //     case 'inactive_account':
  //     return 'getRMNonFinancials_inactive_account';
  //     case 'dormant_account':
  //     return 'getRMNonFinancials_dormant_account';
  //     case 'account_reactivation_this_year':
  //     return 'getRMNonFinancials_account_reactivation_this_year';
  //     case 'account_reactivation_this_month':
  //     return 'getRMNonFinancials_account_reactivation_this_month';
  //   }
  // }

  // setRMNonFinancials_Result(type: string, res: any) {
  //   switch (type) {
  //     case 'all_account':
  //     this.accountsOpenedData['TOTAL_ACCTS'] = res[0].TOTAL_ACCTS;
  //     break;
  //     case 'all_account_this_year':
  //     this.accountsOpenedData['TOTAL_ACCTS_YEAR'] = res[0].TOTAL_ACCTS;
  //     break;
  //     case 'all_account_5k':
  //     this.accountsOpenedData['TOTAL_ACCTS_5K_AVG'] = res[0].TOTAL_ACCTS_5K_AVG;
  //     break;
  //     case 'unfunded_account':
  //       this.accountsOpenedData['UNFUNDED_ACCTS'] = res[0].UNFUNDED_ACCTS;
  //       break;
  //     case 'active_account':
  //     this.accountStatusData['ACTIVE_ACCT'] = res[0].ACCT_STATUS;
  //     break;
  //     case 'inactive_account':
  //     this.accountStatusData['INACTIVE_ACCT'] = res[0].ACCT_STATUS;
  //     break;
  //     case 'dormant_account':
  //     this.accountStatusData['DORMANT_ACCT'] =  res[0].ACCT_STATUS;
  //     break;
  //     case 'account_reactivation_this_year':
  //     this.reactivatedAccountData['REACTIVATED_ACCTS_YEAR'] =  res[0].REACTIVATED_ACCTS;
  //     break;
  //     case 'account_reactivation_this_month':
  //     this.reactivatedAccountData['REACTIVATED_ACCTS_MONTH'] = res[0].REACTIVATED_ACCTS;
  //     break;
  //   }
  // }

  // getRMNonFinancials(type: string, staffId?: string) {

  //   return new Promise((resolve, reject) => {

  //     this.isInprogress2 = true;

  //     this.dataService.Get(`${this.getRMNonFinancials_URL(type)}?userId=${staffId}`).subscribe(
  //       res => {
  //         this.showNotFoundMsg2 = res.length > 0 ? false : true;
  
  //         console.log(type + ': ', JSON.stringify(res[0].ACCT_STATUS));
  
  //         this.setRMNonFinancials_Result(type, res);
  
  //         this.isInprogress2 = false;
  //         return resolve();
  //       },
  //       error => {
  //         // console.log(error);
  //         this.showNotFoundMsg2 = true;
  //         this.utilityService.showErrorToast(error, 'Something went wrong!');
  //        // this.isInprogress2 = false;
  //        return reject();
  //       }
  //     );

  //   });

  
  // }

  // async callGetRMNonFinancial() {
  //   this.accountsOpenedData = [];
  //   this.accountStatusData = [];
  //   this.reactivatedAccountData = [];


  //  await this.getRMNonFinancials('all_account' , this.staffId);
  //  await this.getRMNonFinancials('all_account_this_year' , this.staffId);
  //  await this.getRMNonFinancials('all_account_5k' , this.staffId);

  //  await this.getRMNonFinancials( 'active_account', this.staffId);
  //  await this.getRMNonFinancials( 'inactive_account' , this.staffId);
  //  await this.getRMNonFinancials('dormant_account' , this.staffId);
  //  await this.getRMNonFinancials('account_reactivation_this_year' , this.staffId);
  //  await this.getRMNonFinancials('account_reactivation_this_month', this.staffId);

  //  await this.getRMNonFinancials( 'unfunded_account', this.staffId);
  // }

  onRMDashboardColumnSelected($event) {
   // console.log('column selected:', $event);
   this.tableClicked = 'dashboard';
   this.page = 1;
  this.showTextFilter = false;

    switch ($event) {
      case 'TOTAL_DEPOSIT':
      this.RMDashboardDetailReportTitle = 'Total Deposit Details';
      this.rmDashboardColumnSelected = 'td';
      this.getRMDashboardDetail('td');
      break;
      case 'TOTAL_LOAN':
      this.RMDashboardDetailReportTitle = 'Total Loans Details';
      this.rmDashboardColumnSelected = 'tl';
      this.getRMDashboardDetail('tl');
      break;
      case 'TOTAL_ACCTS':
      this.RMDashboardDetailReportTitle = 'Total Account Details';
      this.rmDashboardColumnSelected = 'ta';
      this.getRMDashboardDetail('ta');
      break;
    }

  }

  onNonFinAccOpenColumnSelected($event) {
    this.tableClicked = 'nonfinaccopen';
    this.page = 1;
    this.showTextFilter = false;

     switch ($event) {
       case 'TOTAL_ACCTS':
       this.RMDashboardDetailReportTitle = 'All Accounts Details';
       this.nonFinAccOpenColumnSelected = 'ta';
       this.getRMDashboardDetail('ta');
       break;
       case 'TOTAL_ACCTS_YEAR':
       this.RMDashboardDetailReportTitle = 'Accounts Opened In Current Year Details';
       this.nonFinAccOpenColumnSelected = 'tacy';
       this.getRMDashboardDetail('tacy');
       break;
       case 'TOTAL_ACCTS_5K_AVG':
       this.RMDashboardDetailReportTitle = 'Account Opened In Current Year With 5000 AVG. BAL Details';
       this.nonFinAccOpenColumnSelected = 'ta5k';
       this.getRMDashboardDetail('ta5k');
       break;
       case 'UNFUNDED_ACCTS':
       this.RMDashboardDetailReportTitle = 'Unfunded Account Details';
       this.nonFinAccOpenColumnSelected = 'ua';
       this.getRMDashboardDetail('ua');
       break;
     }

   }

   onNonFinAccStatusColumnSelected($event) {
    this.tableClicked = 'nonfinaccstatus';
    this.page = 1;
    this.showTextFilter = false;

     switch ($event) {
       case 'ACTIVE_ACCT':
       this.RMDashboardDetailReportTitle = 'Active Accounts Details';
       this.nonFinAccStatusColumnSelected = 'tad';
       this.getRMDashboardDetail('tad');
       break;
       case 'INACTIVE_ACCT':
       this.RMDashboardDetailReportTitle = 'Inactive Accounts Details';
       this.nonFinAccStatusColumnSelected = 'tasi';
       this.getRMDashboardDetail('tasi');
       break;
       case 'DORMANT_ACCT':
       this.RMDashboardDetailReportTitle = 'Dormant Accounts Details';
       this.nonFinAccStatusColumnSelected = 'tasd';
       this.getRMDashboardDetail('tasd');
       break;
     }

   }


   onNonFinReactivatedAccColumnSelected($event) {
    this.tableClicked = 'nonfinreactedacc';
    this.page = 1;
    this.showTextFilter = false;

     switch ($event) {
       case 'REACTIVATED_ACCTS_YEAR':
       this.RMDashboardDetailReportTitle = 'Reactivated Account Current Year Details';
       this.nonFinReactivatedAccColumnSelected = 'tracy';
       this.getRMDashboardDetail('tracy');
       break;
       case 'REACTIVATED_ACCTS_MONTH':
       this.RMDashboardDetailReportTitle = 'Reactivated Account Current Month Details';
       this.nonFinReactivatedAccColumnSelected = 'tracm';
       this.getRMDashboardDetail('tracm');
       break;
     }

   }



  onSearch($event) {
   // console.log('Search params:', JSON.stringify($event));
   this.staffId = $event.sText1;
    if (this.staffId && this.staffId.length !== 5) {
      this.utilityService.showErrorToast(`Please enter a valid 5-digit Staff ID`, 'Invalid Staff ID!');
      return;
    }

    this.page = 1;
    this.showTextFilter = false;
    this.getRMDashboard(this.staffId);

  // this.callGetRMNonFinancial();
   this.getRMNonFinancials(this.staffId);
  }



  ExportToExcel_onRMDashboardColumnSelected() {
       this.getRMDashboardDetail(this.rmDashboardColumnSelected, 1);
   }

   ExportToExcel_onNonFinAccOpenColumnSelected() {
    this.getRMDashboardDetail(this.nonFinAccOpenColumnSelected, 1);
    }

    ExportToExcel_onNonFinAccStatusColumnSelected() {
      this.getRMDashboardDetail( this.nonFinAccStatusColumnSelected, 1);
    }

    ExportToExcel_onNonFinReactivatedAccColumnSelected() {
      this.getRMDashboardDetail(this.nonFinReactivatedAccColumnSelected, 1);
    }

// pagination
onPageChange_onRMDashboardColumnSelected(offset) {
  this.page = (offset / this.per_page) + 1;
  this.getRMDashboardDetail(this.rmDashboardColumnSelected);
}

onPageChange_onNonFinAccOpenColumnSelected(offset) {
  this.page = (offset / this.per_page) + 1;
this.getRMDashboardDetail(this.nonFinAccOpenColumnSelected);
}

onPageChange_onNonFinAccStatusColumnSelected(offset) {
  this.page = (offset / this.per_page) + 1;
 this.getRMDashboardDetail( this.nonFinAccStatusColumnSelected);
}

onPageChange_onNonFinReactivatedAccColumnSelected(offset) {
  this.page = (offset / this.per_page) + 1;
 this.getRMDashboardDetail(this.nonFinReactivatedAccColumnSelected);
}


}
