import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Chart } from 'angular-highcharts';
import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IChannelMovement } from '../../shared/my-interfaces';
import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-channel-movement',
  templateUrl: './channel-movement.component.html',
  styleUrls: ['./channel-movement.component.scss'],
  animations: [fadeAnimation] // register the animation
})
export class ChannelMovementComponent implements OnInit {
  productChart: Chart;
  regionChart: Chart;
  zoneChart: Chart;
  branchChart: Chart;

  isInprogress = false;
  isSearchedBefore = false;
  channelMovement: IChannelMovement[] = [];



  myAccess: any = {};

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {

    this.getChannelMovement();
    this.myAccess = this.utilityService.getAccessInfo('Account Statistics');
  }



  getChannelMovement() {

    this.isSearchedBefore = true;
    this.isInprogress = true;
    this.dataService.Get(`getChannelMovement`).subscribe(
      res => {
        // const results: IAccountStatitics[] = res;
        this.isInprogress = false;
        this.channelMovement = res;

      },
      error => {
        // console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }



}




