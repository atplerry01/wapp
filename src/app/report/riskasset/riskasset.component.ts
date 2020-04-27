import { Component, OnInit } from '@angular/core';


import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IRiskAsset, IBranch } from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';


@Component({
  selector: 'app-riskasset',
  templateUrl: './riskasset.component.html',
  styleUrls: ['./riskasset.component.scss'],
 // animations: [fadeAnimation] // register the animation
})
export class RiskassetComponent implements OnInit {

  selectedBranch = 0;
  selectedClassification = '0';
  isInprogress = false;
  isSearchedBefore = false;

  totalLoan = 0;
  totalBalance = 0;
  totalOverdue = 0;

  branches: IBranch[] = [];
  reports: IRiskAsset[] = [];

  myAccess: any = {};

  constructor(private dataService: DataService, public utilityService: UtilityService) {

  }

  ngOnInit() {
    this.myAccess = this.utilityService.getAccessInfo('Risk Assets');
    this.loadBranchList();
  }


  loadBranchList() {
    this.utilityService.getBranchList(this.myAccess) .subscribe((res) => {
      this.branches = res;
    },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      });
  }



  getRiskAssetReport() {

    if (this.selectedClassification === '0') { return; }

    this.isSearchedBefore = true;
    this.isInprogress = true;
    this.dataService.Get(`getRiskAssets?bankcode=${this.selectedBranch}&classification=${this.selectedClassification}`)
      .subscribe((res) => {
        this.reports = res;
        this.isInprogress = false;
        console.log('reports:', this.reports);

        this.reports.forEach(val => {
          this.totalLoan += Number(val.loan_amount);
          this.totalBalance += Number(val.outstanding_balance);
          this.totalOverdue += Number(val.overdue_amount);
        });


      },
        error => {
         // console.log(error);
         this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }


}
