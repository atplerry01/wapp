import { Component, OnInit, ViewChild } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IBranch, IMaturityProfile } from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-maturityprofile',
  templateUrl: './maturityprofile.component.html',
  styleUrls: ['./maturityprofile.component.scss'],
 // animations: [fadeAnimation] // register the animation
})
export class MaturityProfileComponent implements OnInit {


  isInprogress = false;
  isSearchedBefore = false;

  accounts: IMaturityProfile[] = [];
  branches: IBranch[] = [];
  selectedBranchCode = 'ALL';
  selectedDays = '7';

  totalDepositamount = 0;
  totalAverageinterestrate = 0;
  totalClearedbalance = 0;
  totalInterestpayable  = 0;

  myAccess: any = {};

  constructor(private dataService: DataService, public utilityService: UtilityService) {
  }



  ngOnInit() {
    this.myAccess = this.utilityService.getAccessInfo('Fixed Deposit - Maturity Profile');

    if (this.myAccess.key !== 'B') {
    this.loadBranchList();
    }
  }

  loadBranchList() {
    this.utilityService.getBranchList(this.myAccess) .subscribe((res) => {
      this.branches = res;
    },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      });
  }



  getMaturity_profile() {


    this.accounts = [];
    this.isSearchedBefore = true;
    this.isInprogress = true;


    this.dataService.Get(`getMaturity_profile?bankcode=${this.selectedBranchCode}&days=${this.selectedDays}`)
      .subscribe((res) => {
        this.accounts = res;
        this.isInprogress = false;
        // console.log('account:',  this.accounts);
        if ( this.accounts.length > 1) {

          this.sumTotal(null, null, null, null, true);

          this.accounts.forEach(val => {
            this.sumTotal(val.depositamount, val.interestrate, val.clearedbalance, val.interestpayable);
          });

          this.avgTotal(); // calculate the total avergage
        }
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
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

}
