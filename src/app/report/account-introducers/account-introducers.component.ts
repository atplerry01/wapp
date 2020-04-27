import { Component, OnInit } from '@angular/core';
import { IAccountIntroducers, IAccountIntroducersWithPagination } from '../../shared/my-interfaces';
import { DataService } from '../../shared/service/data.service';
import { UtilityService } from '../../shared/service/utility.service';

// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-account-introducers',
  templateUrl: './account-introducers.component.html',
  styleUrls: ['./account-introducers.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class AccountIntroducerComponent implements OnInit {


  isInprogress = false;
  showNotFoundMsg = false;
  accounts: IAccountIntroducers[] = [];

  page = 1; // current page
  per_page = 100;
  totalRecords = 0; // total record
  total_pages = 0;

  selectedDateFrom = '';
  selectedDateTo = '';
  accNumber = '';

  reportHeaders = [
    { name: 'ACCOUNTNO', title: 'Account #', right: false, isDate: false, isNumber: false },
    { name: 'ACCOUNTNAME', title: 'Account Name', right: false, isDate: false, isNumber: false },
    { name: 'ACCOUNTTYPE', title: 'ccount Type', right: false, isDate: false, isNumber: false },
    { name: 'AVERAGE_CREDIT', title: 'Average Credit', right: true, isDate: false, isNumber: true, total: 0  },
    { name: 'AVERAGE_DEBIT', title: 'Average Debit', right: true, isDate: false, isNumber: true, total: 0  },
    { name: 'BALANCE', title: 'Actual Balance', right: true, isDate: false, isNumber: true, total: 0  },
    { name: 'BRANCH', title: 'Branch', right: false, isDate: false, isNumber: false },
    { name: 'OPENDATE', title: 'Open Date', right: false, isDate: true, isNumber: false},
    { name: 'CURRENCY', title: 'Currency', right: false, isDate: false, isNumber: false },
    { name: 'ACCOUNTMGR', title: 'Account Mgr.', right: false, isDate: false, isNumber: false },
    { name: 'STAFFID', title: 'Staff Id', right: false, isDate: false, isNumber: false}
  ];


  constructor(private dataService: DataService, public utilityService: UtilityService) {
  }



  ngOnInit() {
    this.getAccIntroducers();
  }


  getAccIntroducers() {

    if (this.accNumber && (this.accNumber.length !== 10 || isNaN(Number(this.accNumber)))) {
      this.utilityService.showErrorToast('Please enter valid account number', 'Invalid Account Number');
      return;
    }

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const dates = `datefrom=${this.selectedDateFrom}&dateto=${this.selectedDateTo}`;
    const url = `getAccIntroducers?${dates}&accnumber=${this.accNumber}&page=${this.page}&per_page=${this.per_page}`;
    this.dataService.Get(url)
      .subscribe((res) => {

        const result: IAccountIntroducersWithPagination = res;
        if (result && result.data.length) {
          // console.log(res, result);
          this.accounts = result.data;

          this.totalRecords = result.total;
          this.total_pages = result.total_pages;

          this.reportHeaders[3].total =  result.totalAvgCredit;
          this.reportHeaders[4].total = result.totalAvgDebit;
          this.reportHeaders[5].total =  result.totalBalance;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.accounts = [];
          this.totalRecords = 0;
          this.total_pages = 0;


          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }



  onSearch($event) {
    // console.log('Search params:', JSON.stringify($event));

     this.selectedDateFrom = $event.dateFrom;
     this.selectedDateTo = $event.dateTo;
     this.accNumber = $event.sText1;
     this.per_page = $event.per_page;

     this.getAccIntroducers();
   }

   onPageChange(offset) {
     this.page = (offset / this.per_page) + 1;
     this.getAccIntroducers();
   }


}
