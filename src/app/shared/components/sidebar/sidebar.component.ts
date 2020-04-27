import { Component, OnInit, Input, NgZone, ViewChild, ElementRef } from '@angular/core';

import { DataService } from '../../service/data.service';
import { UtilityService } from '../../service/utility.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent implements OnInit {

  @Input('isHome') isHome = true;
  @ViewChild('profile') profile: ElementRef;

  showSideBar = true;


  mySize = window.innerHeight; // - 150;

  constructor(private ngZone: NgZone, private dataService: DataService, private utilityService: UtilityService) {

    window.onresize = (e) => {
      ngZone.run(() => {
        this.mySize = window.innerHeight; // - 150;
        // console.log(window.innerWidth);
        // console.log(window.innerHeight);
      });
    };
  }



  ngOnInit() {
  //  console.log('profile height:', this.profile.nativeElement);
    this.utilityService.showSidebarBS_newValue.subscribe(res => this.showSideBar = res);
  }

  onImageChange(event) {

  }
}
