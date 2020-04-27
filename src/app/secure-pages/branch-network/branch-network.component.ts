import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import {
  IRegionSummary,
  IZoneSummary,
  IBranchDetail
} from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-branch-network',
  templateUrl: './branch-network.component.html',
  styleUrls: ['./branch-network.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class BranchNetworkComponent implements OnInit {
  isInprogress = false;
  isSearchedBefore = false;

  regionSummary: IRegionSummary[] = [];
  zoneSummary: IZoneSummary[] = [];
  branchDetail: IBranchDetail[] = [];

  // selectedZoneCode = '';
  selectedRegionIndex: number = null;
  selectedZoneIndex: number = null;

  totalZone = 0;
  totalBranches = 0;

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getAccountStatiticsByRegion(null, '', '');
  }

  close() {
    this.zoneSummary = [];
    this.branchDetail = [];
    this.selectedZoneIndex = null;
    this.selectedRegionIndex = null;
  }

  getAccountStatiticsByRegion(index: number, drilldownLevel: string, code) {
    this.isInprogress = true;

    this.dataService.Get(`getBranchNetwork?drilldownLevel=${drilldownLevel}&code=${code}`)
      .subscribe(res => {
        if (drilldownLevel === 'B') {
          this.selectedZoneIndex = index;
          this.branchDetail = res;
          if (this.branchDetail.length < 1) {
            this.utilityService.showInfoToast('Drilldown not available at the moment', 'Drilldown!');
            this.close();
          }
        } else if (drilldownLevel === 'Z') {
          this.zoneSummary = res;
          this.selectedRegionIndex = index;


          if (this.zoneSummary.length < 1) {
            this.utilityService.showInfoToast('Drilldown not available at the moment', 'Drilldown!');
            this.close();
          }
        } else {
          this.regionSummary = res;

          if (this.regionSummary.length > 1) {
            this.totalZone = 0;
            this.totalBranches = 0;

            this.regionSummary.forEach(x => {
              this.totalZone += x.TotalZones;
              this.totalBranches += x.TotalBranches;
            });

          } else {
            this.utilityService.showInfoToast('Drilldown not available at the moment', 'Drilldown!');
            this.close();
          }

        }

        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }
}
