import { Component, OnInit } from '@angular/core';


import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IFistTimeDebit, IBranch } from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';


@Component({
  selector: 'app-firsttime-debit',
  templateUrl: './firsttime-debit.component.html',
  styleUrls: ['./firsttime-debit.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class FirstTimeDebitComponent implements OnInit {

  selectedBranch = 0;
  isInprogress = false;
  isSearchedBefore = false;


  branches: IBranch[] = [];
  reports: IFistTimeDebit[] = [];

  myAccess: any = {};
  totalBalance = 0.00;

  constructor(private dataService: DataService, public utilityService: UtilityService) {

  }

  ngOnInit() {
    this.myAccess = this.utilityService.getAccessInfo('First-Time Debit');

    if (this.myAccess.key === 'B') {
      this.getFirstTimeDebit();
    } else {
      this.loadBranchList();
    }
  }


  loadBranchList() {
    this.utilityService.getBranchList(this.myAccess).subscribe((res) => {
      this.branches = res;
    },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      });
  }



  getFirstTimeDebit() {

    if (this.selectedBranch === 0 && this.myAccess.key !== 'B') {
      this.reports = [];
      return;
    }

    this.isSearchedBefore = true;
    this.isInprogress = true;
    this.dataService.Get(`getFirstTimeDebit?branchcode=${this.selectedBranch}`)
      .subscribe((res) => {
        this.reports = res;
        this.isInprogress = false;

        this.totalBalance = 0;
        if (this.reports.length > 1) {
        this.reports.forEach(val => {
          this.totalBalance += val.Balance;
        });
      }

      },
        error => {
         // console.log(error);
         this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }


}
