import { Component, NgZone, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { UtilityService } from '../../service/utility.service';

// You add it here
// import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // @ViewChild('myMenu') myMenu: ElementRef;
  visible = false;
  display = false;
  selectedUL: number;

  // profilePix = 'assets/images/avatar.jpg';
  // sticky = 0;
  menu: any[] = [];
  // constructor(private ngzone: NgZone, private el: ElementRef, private dataService: DataService, private utilityService: UtilityService) {

  //   // this.ngzone.run(() => {
  //   //   window.onscroll = () => {
  //   //     // this.setStickyMenu();
  //   //   };

  //   // });
  // }

  constructor(
    private ngzone: NgZone,
    private dataService: DataService,
    private utilityService: UtilityService
  ) {
    this.ngzone.run(() => {
      window.onresize = () => {
        this.selectedUL = null;
        this.display = false;
        this.visible = false;
      };
    });
  }

  ngOnInit() {
    // this.sticky = this.myMenu.nativeElement.offsetTop;

    // if menu is loaded in the browser session then convert to json and store it
    if (!!this.dataService.getStoredTempData('xyz123xyz_menu')) {
      this.menu = JSON.parse(this.dataService.getStoredTempData('xyz123xyz_menu'));

      // remove admin menu
      // const indx = this.menu.findIndex(x => x.header === 'APP ADMIN');
      // console.log('index:', indx);
      // if (indx !== -1) {
      //   this.menu.splice(indx, 1);
      // }

    }
  }

  onNavbarClick() {
    this.visible = !this.visible;
  }

  onMenuDropdownULClick(i) {
    if (window.innerWidth > 900) {
      return;
    }

    if (i !== this.selectedUL) {
      this.selectedUL = i;
      this.display = true;
    } else {
      this.display = !this.display;
      this.selectedUL = i;
    }
  }

  // setStickyMenu() {
  //   if (window.pageYOffset >= this.sticky) {
  //     this.myMenu.nativeElement.classList.add('sticky');
  //   } else {
  //     this.myMenu.nativeElement.classList.remove('sticky');
  //   }
  // }

  goto(internal: string, linkid: string, link: string) {
    this.utilityService.goto(internal, linkid, link);
  }

  gohome() {
    this.utilityService.navigate('/');
  }

  logout() {
    this.dataService.logout();
  }

  // toggleSidebar() {
  //   let sh = false;
  //   this.utilityService.showSidebarBS_newValue.subscribe(res => sh = res);
  //   this.utilityService.toggleSideBar(!sh);
  // }
}
