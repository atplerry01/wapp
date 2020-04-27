import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IAccount, IAccountDetail, IEmployee, IAccountStats, AccountTD, IAccountLoan } from '../../shared/my-interfaces';

import { environment } from '../../../environments/environment';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-account-enquiry',
  templateUrl: './account-enquiry.component.html',
  styleUrls: ['./account-enquiry.component.scss'],
 // animations: [fadeAnimation] // register the animation
  // animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': '' }
})
export class AccountEnquiryComponent implements OnInit {

  // isMyAccount = false;
  myAccount: any = null;
  isInprogress = false;
  isSearchedBefore = false;
  isSearchingByAccName = false;
  isLoadingAccStats = false;
  selectedDialogVal = '';
  showModel = false;
  searchType = 'Account Number';

  accounts: IAccountDetail[] = [];
  accountsTD: AccountTD[] = [];
  accountsLoan: IAccountLoan[] = [];
  accountFirst: IAccountDetail = null; // get the account being searched
  accountFirstStats: IAccountStats = null; // get the account being searched transaction stats
  accountFirstManager: IEmployee = null; // get the account being searched
  accountOthers: IAccountDetail[] = []; // get the other accounts of same customer being searched

  searchedAccounts: IAccount[] = [];

  // navigationSubscription;
 // id = 2; //hold the route id
  cDate = '';
  cMonthStartDate = ''; // first day of the month. e.g. 01-Jun-2018
  cMonthEndDate = ''; // last day of the month. e.g. 30-Jun-2018
  cYearStartDate = ''; // first day of the year. e.g. 01-Jan-2018
  cYearEndDate = ''; // last day of the year. e.g. 3a-Dec-2018
  custMDOB = ''; // Hold customer birthday if it falls in the current month
myAccess: any = {};

  @ViewChild('dps') dpsElementRef: ElementRef;
  @ViewChild('note') noteElementRef: ElementRef;
  @ViewChild('searchTerm') searchTerm: ElementRef;

  constructor(private dataService: DataService, public utilityService: UtilityService
    // , private route: ActivatedRoute, private router: Router
  ) {

    // this.route.params.subscribe(res => {
    //   // console.log('param...');
    //   if (res.id && res.id === '1') {
    //     //this.id = Number(res.id);
    //     this.isMyAccount = true;
    //   }

    // });

    // // subscribe to the router events - storing the subscription so
    // // we can unsubscribe later.
    // this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //   // If it is a NavigationEnd event re-initalise the component

    //   this.route.params.subscribe(res => {
    //     //  console.log('param...');
    //     this.isMyAccount = false;
    //     if (res.id && res.id === '1') {
    //      // this.id = Number(res.id);
    //       this.isMyAccount = true;
    //     }

    //     if (e instanceof NavigationEnd) {
    //       // console.log('nav...');
    //       this.loadOnBoot();
    //     }

    //   });


    // });


  }

  ngOnInit() {

    this.cDate = this.utilityService.getCurrentDate();
    this.cMonthStartDate = this.utilityService.getCurrentMonthStartDate();
    this.cMonthEndDate = this.utilityService.getCurrentMonthEndDate();
    this.cYearStartDate = this.utilityService.getCurrentYearStartDate();
    this.cYearEndDate = this.utilityService.getCurrentYearEndDate();

    if (!environment.production) { // this this content on development environment
      // this.searchTerm.nativeElement.value = '0702257748';
      this.searchTerm.nativeElement.value = '0224886420';
    }

    this.myAccess = this.utilityService.getAccessInfo('Customer Account');
  }



  reset() {
    this.isSearchedBefore = false;
    this.accounts = [];
    this.accountFirst = null;
    this.accountFirstManager = null;
    this.accountFirstStats = null;
    this.accountOthers = [];
    this.searchedAccounts = [];
    this.searchTerm.nativeElement.value = '';
    this.searchTerm.nativeElement.focus();
  }

  getAccountByAccName(term: string) {

    if (!term.trim() || term.length < 3) {
      return;
    }

    this.isSearchingByAccName = true;
    this.isInprogress = true;
    this.dataService.Get('searchAccountByAccName/' + term)
      .subscribe((res) => {
        // console.log('login result:', res);
        this.searchedAccounts = res;
        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }

  getAccountsByAccountNo(accno: string) {

    this.isInprogress = true;
    this.dataService.Get(`getCustomerAccounts?accno=${accno}&ownaccount=2`)
      .subscribe((res) => {

        this.accounts = res.accountdetail;

        if (this.accounts && this.accounts.length > 1) {
          this.accountFirst = this.accounts.filter(x => x.ACCOUNTNUMBER === accno)[0];
          this.accountOthers = this.accounts.filter(x => x.ACCOUNTNUMBER !== accno);
        } else if (this.accounts && this.accounts.length === 1) {
          this.accountFirst = this.accounts[0];
        }

        if (res.accountmanger && res.accountmanger.length > 0) {
          this.accountFirstManager = res.accountmanger[0];
        }

        this.isInprogress = false;
        this.isSearchedBefore = true;


        if (this.accounts && this.accounts.length > 0) {
          this.getCustomerTDAccountNo(accno);
          this.getCustomerLoanAccountNo(accno);
          this.getAccountStatsByAccountNo(accno); // get selected account stats
          this.getThisMonthCustomerBirthdayByCustomerID(); // get customer birthday
        }

      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.isSearchedBefore = true;
        });
  }

  getCustomerTDAccountNo(accno: string) {

    this.dataService.Get(`getCustomerTD/${accno}`)
      .subscribe((res) => {
        this.accountsTD = res;
      },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          // console.log(error);
        });
  }

  getCustomerLoanAccountNo(accno: string) {

    this.dataService.Get(`getCustomerLoan/${accno}`)
      .subscribe((res) => {
        this.accountsLoan = res;
      },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          // console.log(error);
        });
  }

  getAccountStatsByAccountNo(accno: string) {

    this.accountFirstStats = null;
    this.isLoadingAccStats = true;


    // tslint:disable-next-line:max-line-length
    this.dataService.Get(`getCustomerAccountsTransStat?accno=${accno}&cDate=${this.cDate}&cMonthStartDate=${this.cMonthStartDate}&cMonthEndDate=${this.cMonthEndDate}&cYearStartDate=${this.cYearStartDate}&cYearEndDate=${this.cYearEndDate}`)
      .subscribe((res) => {

        if (res && res.length > 0) {
          this.accountFirstStats = res[0];
        }
        this.isLoadingAccStats = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isLoadingAccStats = false;
        });
  }

  selectSearchedAccount(accountnumber) {
    // console.log('Selected Account:', accountnumber);

    this.searchedAccounts = [];
    this.isSearchingByAccName = false;
    this.searchType = 'Account Number';
    this.searchTerm.nativeElement.value = accountnumber;

    this.searchAccount(accountnumber);

  }

  selectSearchType(selected) {
    this.searchType = selected;
    this.reset();
    // this.dpsElementRef.nativeElement.style.display='none';
  }


  searchAccount(searchTerm: string) {
    const term = searchTerm.trim();

    if (!term) {
      return;
    }

    this.resetMainData();

    if (this.searchType === 'Customer Name') {
      this.getAccountByAccName(term);
    } else {
      if (isNaN(Number(term)) || term.length !== 10) {
        alert('Invalid account number');
        return;
      }

      this.getAccountsByAccountNo(term);
    }
  }

  resetMainData() {
    this.accounts = [];
    this.accountFirst = null;
    this.accountFirstManager = null;
    this.accountFirstStats = null;
    this.accountOthers = [];
  }




  getThisMonthCustomerBirthdayByCustomerID() {
    if (!this.accountFirst || !!this.dataService.getStoredTempData(`checked-dbo-${this.accountFirst.CUSTOMERID}`)) {
      return;
    }

    this.dataService.Get(`getThisMonthCustomerBirthdayByCustomerID/${this.accountFirst.CUSTOMERID}`)
      .subscribe((res) => {
        if (res && res.DOB) {
          // console.log('customer birthday is in this month: ', res.DOB);
          this.custMDOB = res.DOB;
          this.showPopupModel('dob');
        }
      },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          // console.log('Customer birthday error: ', error);
        });

    this.dataService.StoreTempData(`checked-dbo-${this.accountFirst.CUSTOMERID}`, true);
  }

  getAccOnAlatIcon() {
    // tslint:disable-next-line:max-line-length
    // return this.accountFirst && this.accountFirst.BRANCHCODE === '800' ? 'ALAT / WemaMobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-check"></i>' : 'ALAT / WemaMobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-times"></i>';
    return 'ALAT / WemaMobile';
  }

  getTransAlertIcon() {
    return this.accountFirst && this.accountFirst.TRANALERTS ?
    'TransAlert&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-check"></i>'
    : 'TransAlert&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-times"></i>';
  }

  gotoStatement(acc: IAccountDetail) {
    this.dataService.StoreTempData('accountFirst', JSON.stringify(acc));
    this.utilityService.navigate(`/sc/accenquiry/accstatement`);
  }

  onAddNote(note: string) {
    const nb = note.trim();
    if (!nb) {
      return;
    }
    alert(nb);
    this.noteElementRef.nativeElement.value = '';
    this.noteElementRef.nativeElement.focus();
  }

  showPopupModel(event: string) {
    this.selectedDialogVal = event;
    this.showModel = true;
  }

  // ngOnDestroy() {
  //   // avoid memory leaks here by cleaning up after ourselves. If we
  //   // don't then we will continue to run our initialiseInvites()
  //   // method on every navigationEnd event.
  //   if (this.navigationSubscription) {
  //     this.navigationSubscription.unsubscribe();
  //   }
  // }

}
