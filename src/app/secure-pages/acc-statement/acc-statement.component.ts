import { Component, OnInit } from '@angular/core';
import { IAccountDetail, IAccountStatement } from '../../shared/my-interfaces';
// import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/service/data.service';
import { UtilityService } from '../../shared/service/utility.service';


@Component({
  selector: 'app-acc-statement',
  templateUrl: './acc-statement.component.html',
  styleUrls: ['./acc-statement.component.scss']
})
export class AccStatementComponent implements OnInit {

  accStatments: IAccountStatement[] = [];
  accountFirst: IAccountDetail = null;

  myBranchCode = '';
  currentUser: any;
  isInprogress = false;
  isSearchedBefore = false;

  selectedDateFrom = '';
  selectedDateTo = '';

  openingBalance = 0;
  holdPrevBalance = 0;
  totalDebit = 0;
  totalCredit = 0;

  // constructor(private dataService: DataService, public utilityService: UtilityService, private route: ActivatedRoute, private router: Router) {
  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) {
    // this.route.params.subscribe(res => {
    //   if (res.accno && res.acctype) {
    //     this.accountNo = res.accno;
    //     this.accountType = res.acctype;
    //     //this.id = res.id;
    //   } else {
    //     this.utilityService.goBack();
    //   }
    // });
  }

  ngOnInit() {

    this.currentUser = this.dataService.getCurrentUser();
    if (!!this.dataService.getStoredTempData('xyz123xyz_scopeLevel')) {
      const scopeLevel = JSON.parse(
        this.dataService.getStoredTempData('xyz123xyz_scopeLevel')
      );
      this.myBranchCode = scopeLevel.branchcode;
    } else {
      this.utilityService.showErrorToast('Your branch code is not set', 'Undefined Scope Level');
      this.utilityService.goBack();
    }

    if (!!this.dataService.getStoredTempData('accountFirst')) {
      this.accountFirst = JSON.parse(
        this.dataService.getStoredTempData('accountFirst')
      );
    } else {
      this.utilityService.showErrorToast('Could not retrieve the account number', 'Undefined Scope Level');
      this.utilityService.goBack();
    }
  }

  DateFrom_Changed($event) {
    this.selectedDateFrom = $event;
  }

  DateTo_Changed($event) {
    this.selectedDateTo = $event;
  }


  getOpeningBalance() {
    //  console.log('selectedDateFrom:', this.selectedDateFrom);
    //  console.log('selectedDateTo:', this.selectedDateTo);
    if ( !this.selectedDateFrom || !this.selectedDateTo) {
      this.utilityService.showErrorToast('Please select date range', 'Invalid Date Range');
      return;
    }

    if (!this.accountFirst.ACCOUNTNUMBER) {
      this.utilityService.showErrorToast('Please select date range', 'Invalid Account Number');
      return;
    }

    this.isInprogress = true;

    this.dataService
      .Get(
        `getAccountOpeningBalance?accno=${
          this.accountFirst.ACCOUNTNUMBER
        }&datefrom=${this.selectedDateFrom}`
      )
      .subscribe(
        res => {
          this.openingBalance = 0;
          if (res && res.OPENNINGBAL) {
            this.openingBalance = res.OPENNINGBAL;
          }

          this.getStatement();
        },
        error => {
          console.log(error);
          this.isInprogress = false;
          this.isSearchedBefore = true;
        }
      );
  }

  getStatement() {

    this.totalDebit = 0;
    this.totalCredit = 0;

    this.accStatments = [];
    this.isInprogress = true;

    if (!this.accountFirst.ACCOUNTNUMBER) {
      this.utilityService.showErrorToast('Please select date range', 'Invalid Account Number');
      return;
    }

    this.dataService
      .Get(
        `getAccountStatement?accno=${
          this.accountFirst.ACCOUNTNUMBER
        }&datefrom=${this.selectedDateFrom}&dateto=${this.selectedDateTo}&myaccount=1`
      )
      .subscribe(
        res => {
          this.accStatments = res;
          this.isInprogress = false;
          this.isSearchedBefore = true;

          if (this.accStatments.length) {
            this.accStatments.forEach(val => {
              if (val.CR) { this.totalCredit += val.CR;
              } else if (val.DR) { this.totalDebit += val.DR; }
            });
          }
        },
        error => {
          console.log(error);
          this.isInprogress = false;
          this.isSearchedBefore = true;
        }
      );
  }

  getCurrentBalance(index: number, balance: number) {
    if (index <= this.accStatments.length - 1) {
      if (index === 0) {
        balance += this.openingBalance;
      } else {
        balance += this.holdPrevBalance;
      }
    }
    this.holdPrevBalance = balance;

    return balance;
  }

  PrintStatement() {
    const printContents = document.getElementById('myPrintSection').innerHTML;
    const popupWin = window.open('', '_blank', 'width=600,height=600');
    popupWin.document.open();
    popupWin.document.write(
      `<html><head>
      <style> *{font-size: 10px; padding: 0;}
      .hide-on-print{display:none;}
      .printright{position: absolute; top: 0; right: 0;}
      img{display: block !important; position: fixed; bottom: 50%; right: 10%; width: 50px; z-index: -1;}
      table{ width: 100%; margin-top: 100px !important;  -fs-table-paginate: paginate;}
      th, td { text-align: left; padding: 3px;}
      </style>
      </head>
      <body onload='window.print();window.close();'>
        ${printContents}
      </body>
      </html>`
    );
    popupWin.document.close();
  }

  closePage() {
    this.dataService.removeSessionStorage('accountFirst');
    this.utilityService.goBack();
  }
}
