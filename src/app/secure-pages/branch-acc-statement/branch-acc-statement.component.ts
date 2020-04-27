import { Component, OnInit } from '@angular/core';
import { IAccountStatement } from '../../shared/my-interfaces';
// import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/service/data.service';
import { UtilityService } from '../../shared/service/utility.service';

@Component({
  selector: 'app-branch-acc-statement',
  templateUrl: './branch-acc-statement.component.html',
  styleUrls: ['./branch-acc-statement.component.scss']
})
export class BranchAccStatementComponent implements OnInit {

  accStatments: IAccountStatement[] = [];
  accDetail: object = {};
  accNo = '';

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
  printingCost = 0;

  countDebit = 0;
  countCredit = 0;

  currentDate = new Date();

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

  const access =  this.utilityService.getAccessInfo('Bank Account Statement');

  if(!access.key){
    this.utilityService.navigate('/sc/home');
  }

    this.currentUser = this.dataService.getCurrentUser();
    const scopeLevel = JSON.parse(
      this.dataService.getStoredTempData('xyz123xyz_scopeLevel')
    );
    this.myBranchCode = scopeLevel.branchcode;
  }

  DateFrom_Changed($event) {
    this.selectedDateFrom = $event;
  }

  DateTo_Changed($event) {
    this.selectedDateTo = $event;
  }


  getOpeningBalance() {

    if (!this.utilityService.isValidAccountNo(this.accNo)) {
      return;
    }

    if ( !this.selectedDateFrom || !this.selectedDateTo) {
      this.utilityService.showErrorToast('Please select date range', 'Invalid Date Range');
      return;
    }

    this.isInprogress = true;

    this.dataService
      .Get(
        `getAccountOpeningBalance?accno=${
          this.accNo
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
    this.countDebit = 0;
    this.countCredit = 0;
    this.printingCost = 0;

    this.accStatments = [];
    this.accDetail = {};
    this.isInprogress = true;
    this.dataService
      .Get(
        `getAccountStatement?accno=${
          this.accNo
        }&datefrom=${this.selectedDateFrom}&dateto=${this.selectedDateTo}&adddetail=1`
      )
      .subscribe(
        res => {
          this.accStatments = res.statements;
          this.accDetail = res.detail;
          this.isInprogress = false;
          this.isSearchedBefore = true;

          if (this.accStatments.length) {
            this.accStatments.forEach(val => {
              if (val.CR) { this.totalCredit += val.CR; this.countCredit++;
              } else if (val.DR) { this.totalDebit += val.DR;  this.countDebit++; }
            });

            this.printingCost = res.printingCost;
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


  LogCharge() {

    const param = {printingcost: this.printingCost, accno: this.accNo, datefrom: this.selectedDateFrom, dateto: this.selectedDateTo};

    this.dataService
      .Post(param, 'LogAccountStatementDownload')
      .subscribe(
        res => {
         console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }


  PrintStatement() {

    const r = confirm(`Printing/Downloading will log ${this.printingCost} against you/branch. Do want to continue?`);
    if (!r) {
      return; // user has cancel printing
    }

    const printContents = document.getElementById('myPrintSection').innerHTML;
    const popupWin = window.open('', '_blank', 'width=600,height=600');
    popupWin.document.open();
    popupWin.document.write(
      `<html><head>
      <style> *{font-size: 10px; padding: 0;}
      .hide-on-print{display:none;}
      .printright{position: absolute; top: 0; right: 0;}
      img{display: block !important; position: fixed; bottom: 30%; right: 50%; width: 100px; z-index: -10;}
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

    this.LogCharge();
  }

}
