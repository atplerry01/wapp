import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IMaturityProfile } from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class ReportComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

 myDropdownMenu1List =  [{ code: 0, name: 'Account No' }, { code: 1, name: 'Branch' }];
 myDropdownMenu2List =  [{ code: true, name: 'A boy' }, { code: false, name: 'A Girl' }];
 myDropdownMenu3List =  [{ code: 'gh', name: 'Ghana' }, { code: 'ng', name: 'Nigeria' }];
 myDropdownMenu1SelectedCode = 0;
 myDropdownMenu2SelectedCode = true;
 myDropdownMenu3SelectedCode =  'ng';


  page = 1; // current page
  per_page = 100;
  pre_page?: number; // previous
  next_page?: number;
  totalRecords = 0; // total record
  total_pages = 0;



  accounts: IMaturityProfile[] = [];
  selectedBranchCode = '092';
  selectedDays = '7';
  totalDepositamount = 0;
  totalAverageinterestrate = 0;
  totalClearedbalance = 0;
  totalInterestpayable = 0;
  reportHeaders = [
    { name: 'productname', title: 'Product', right: false, isDate: false, isNumber: false },
    { name: 'branchname', title: 'Branch', right: false, isDate: false, isNumber: false },
    { name: 'accountno', title: 'Account #', right: false, isDate: false, isNumber: false },
    { name: 'customername', title: 'Customer', right: false, isDate: false, isNumber: false },
    { name: 'tenor', title: 'Tenor', right: true, isDate: false, isNumber: false },
    { name: 'dateopened', title: 'Date Opened', right: false, isDate: true, isNumber: false },
    { name: 'maturitydate', title: 'Maturity Date', right: false, isDate: true, isNumber: false },
    { name: 'depositamount', title: 'Deposit Amt.', right: true, isDate: false, isNumber: true, total: 0 },
    { name: 'interestrate', title: 'Int. Rate', right: true, isDate: false, isNumber: true, total: 0 },
    { name: 'clearedbalance', title: 'Cleared Bal.', right: true, isDate: false, isNumber: true, total: 0 },
    { name: 'interestpayable', title: 'Int. Payable', right: true, isDate: false, isNumber: true, total: 0 }
  ];



  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getMaturity_profile();
  }


  getMaturity_profile() {

    this.accounts = [];
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    this.dataService.Get(`getMaturity_profile?bankcode=${this.selectedBranchCode}&days=${this.selectedDays}`)
      .subscribe((res) => {
        this.accounts = res;
        this.isInprogress = false;

        this.pre_page = 0;
        this.next_page = 2;
        this.totalRecords = 50;
        this.total_pages = 3;

        // console.log('account:',  this.accounts);
        if (this.accounts.length > 1) {

          this.sumTotal(null, null, null, null, true);

          this.accounts.forEach(val => {
            this.sumTotal(val.depositamount, val.interestrate, val.clearedbalance, val.interestpayable);
          });

          this.avgTotal(); // calculate the total avergage

          // set total for footer
          this.reportHeaders[7].total = this.totalDepositamount;
          this.reportHeaders[8].total = this.totalAverageinterestrate;
          this.reportHeaders[9].total = this.totalClearedbalance;
          this.reportHeaders[10].total = this.totalInterestpayable;

        } else {
          this.showNotFoundMsg = true;
        }
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }

  // function to reset or sum total
  sumTotal(depositamount, interestrate, clearedbalance, interestpayable, reset = false) {
    this.totalDepositamount = reset ? 0 : this.totalDepositamount + Number(depositamount);
    this.totalAverageinterestrate = reset ? 0 : this.totalAverageinterestrate + Number(interestrate);
    this.totalClearedbalance = reset ? 0 : this.totalClearedbalance + Number(clearedbalance);
    this.totalInterestpayable = reset ? 0 : this.totalInterestpayable + Number(interestpayable);
  }

  // function calculate the total avergage
  avgTotal() {
    this.totalAverageinterestrate /= this.accounts.length;
  }


  onSearch($event) {
    console.log('Search params:', JSON.stringify($event));
  }
  onExportToExcel() {
    alert('export to excel button hit....');
  }

  onRowSelected($event) {
    console.log('Row Selected Datea', JSON.stringify($event));
  }

  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;
    this.getMaturity_profile();
  }

  onDropdownMenu1Changed($event) {
    console.log($event);
  }

  onDropdownMenu2Changed($event) {
    console.log($event);
  }

  onDropdownMenu3Changed($event) {
    console.log($event);
  }

  onSort($event) {
    console.log('sort selected:', JSON.stringify($event));
  }

}



