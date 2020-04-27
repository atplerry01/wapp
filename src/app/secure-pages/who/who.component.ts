import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { UtilityService } from '../../shared/service/utility.service';
import { IEmployee, IRegion, IZone, IBranch } from '../../shared/my-interfaces';

@Component({
  selector: 'app-who',
  templateUrl: './who.component.html',
  styleUrls: ['./who.component.scss']
})
export class WhoComponent implements OnInit {
  isSearchedBefore = false;
  isInprogress = false;
  isFirstLoad = false;
  showModel = true;

  employees: IEmployee[] = [];
  // totalGrades: IGradeTotal[] = [];
  isSameGrade = false;
  holdCountVal = 0;
  lastGrade = '';

  regions: IRegion[] = [];
  zones: IZone[] = [];
  branches: IBranch[] = [];

  selectedBranch: IBranch = null;
  selectedRegion: IRegion = null;
  selectedZone: IZone = null;
  selectedZones: IZone[] = [];
  selectedBranches: IBranch[] = [];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {
    // this.getTotalgrade(); //load grade total
    // this.load('all', true);

    this.loadRegions();
    this.loadZones();
    this.loadBranches();
  }

  load(
    searchterm: string,
    regioncode,
    zonecode,
    branch: IBranch,
    firstLoad = false
  ) {
    if (firstLoad) {
      this.isFirstLoad = true;
    }

    this.isSearchedBefore = true;
    this.showModel = false;
    this.selectedBranch = branch;
    const branchcode = branch && branch.branchcode ? branch.branchcode : '';

    if (!regioncode) { this.selectedRegion = null; }
    if (!zonecode) { this.selectedZone = null; }

    this.isInprogress = true;
    this.dataService
      .Get(
        `searchuser?searchterm=${searchterm}&regioncode=${regioncode}&zonecode=${zonecode}&branchcode=${branchcode}`
      )
      .subscribe(
        res => {
          // console.log('login result:', res);
          this.employees = res;
          this.isInprogress = false;
          this.isFirstLoad = false;
        },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.isFirstLoad = false;
        }
      );
  }

  loadRegions() {
    if (!!this.dataService.getStoredData('getRegionList')) {
      this.regions = JSON.parse(
        this.dataService.getStoredData('getRegionList')
      );
      return;
    }

    this.dataService.Get('getRegionList').subscribe(
      res => {
        this.regions = res;
        this.dataService.StoreData(
          'getRegionList',
          JSON.stringify(this.regions)
        );
        // console.log('login result:', res);
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        // console.log(error);
      }
    );
  }

  loadZones() {
    if (!!this.dataService.getStoredData('getZoneList')) {
      this.zones = JSON.parse(this.dataService.getStoredData('getZoneList'));
      return;
    }

    this.dataService.Get('getZoneList').subscribe(
      res => {
        this.zones = res;
        this.dataService.StoreData('getZoneList', JSON.stringify(this.zones));
        // console.log('login result:', res);
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        // console.log(error);
      }
    );
  }

  loadBranches() {
    if (!!this.dataService.getStoredData('getBranchList')) {
      this.branches = JSON.parse(
        this.dataService.getStoredData('getBranchList')
      );
      return;
    }

    this.dataService.Get('getBranchList').subscribe(
      res => {
        this.branches = res;
        this.dataService.StoreData(
          'getBranchList',
          JSON.stringify(this.branches)
        );
        // console.log('login result:', res);
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        // console.log(error);
      }
    );
  }

  loadRegionZones(region: IRegion) {
    if (region.regioncode === 9999) {
      this.selectedRegion = region;
      this.load('', region.regioncode, '', null, true);
    } else {
      this.selectedBranches = [];

      this.selectedRegion = region;
      this.selectedZones = this.zones.filter(
        z => z.regioncode === region.regioncode
      );
    }
  }

  loadRegionBranches(zone: IZone) {
    this.selectedZone = zone;
    this.selectedBranches = this.branches.filter(
      z => z.zonecode === zone.zonecode
    );
  }

  searchEmp(term: string) {
    if (term.trim() && term.length < 3) {
      return;
    }
    if (!term.trim()) {
      term = '';
    } else {
      term = term.trim();
    }

    // reset the values for grade calculations
    this.lastGrade = '';
    this.holdCountVal = 0;
    const regioncode =
      this.selectedRegion && this.selectedRegion.regioncode
        ? this.selectedRegion.regioncode
        : '';
    const zonecode =
      this.selectedZone && this.selectedZone.zonecode
        ? this.selectedZone.zonecode
        : '';
    this.load(term, regioncode, zonecode, this.selectedBranch);
  }

  checkSameGrade(index: number, cGrade: string) {
    if (this.employees.length < 2) {
      this.holdCountVal = 1;
      return;
    }

    if (index <= this.employees.length - 1) {
      this.isSameGrade = cGrade === this.lastGrade;
      if (this.isSameGrade) {
        this.holdCountVal++;
      } else {
        this.holdCountVal = 1;
      }

      // console.log('Grade: ', cGrade);
      // console.log('Last Grade: ',  this.lastGrade);
      // console.log('is it same Grade: ', this.isSameGrade);
      // console.log('---------------------------------------');
    } else {
      this.isSameGrade = false;
      this.holdCountVal = 1;
    }

    this.lastGrade = cGrade;
  }
}

// interface IGradeTotal {
//   TotalGrade: number;
//   gradeshortname: string;
// }
