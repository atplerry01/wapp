import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
// import { SwUpdate } from '@angular/service-worker';
import { DataService } from './shared/service/data.service';
import { SeoService } from './shared/service/seo.service';
import { UtilityService } from './shared/service/utility.service';
// import { PushNotificationsService } from './shared/service/push-notification.service';

// import * as myClient from './shared/service/client-detector.service';
// import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  currentYear = '';
  lastAction: any;
  MINUTES_UNITL_AUTO_LOGOUT = 60; // in mins
  CHECK_INTERVAL = 1000; // in ms
  clearTimeInterval: any;


  constructor(
    // private swUpdate: SwUpdate,
    public utilityService: UtilityService,
     private seoService: SeoService,
    private dataService: DataService,
    // private _notificationService: PushNotificationsService,
    private ngZone: NgZone) {

   // this._notificationService.requestPermission();

    this.seoService.addSeoData();

    // console.log('myClient: ', myClient.ClientDetector.getClient());
    // console.log('myClient: ', myClient.ClientDetector.getOs());

  }

  ngOnInit() {
    const dt = new Date();
    this.currentYear = dt.getUTCFullYear().toString();

    // if (this.swUpdate.isEnabled) {
    //   this.swUpdate.available.subscribe(() => {
    //     if (confirm('New update available. Load New Update?')) {
    //       window.location.reload();
    //     }
    //   });
    // }

     // run outside angular Change detection
     this.ngZone.run(() => {
      this.check();
      this.initListener();
      this.initInterval();
    });

  }


  // notify() {
  //   const data: Array<any> = [];
  //   data.push({
  //     'title': 'First Notification from Wema',
  //     'alertContent': 'This is First Alert -- '
  //   });
  //   data.push({
  //     'title': 'Request',
  //     'alertContent': 'This is Second Alert '
  //   });
  //   data.push({
  //     'title': 'Leave Application',
  //     'alertContent': 'This is Third Alert '
  //   });
  //   data.push({
  //     'title': 'Approval',
  //     'alertContent': 'This is Fourth Alert '
  //   });
  //   data.push({
  //     'title': 'To Do Task',
  //     'alertContent': 'This is Fifth Alert '
  //   });
  //   this._notificationService.generateNotification(data);
  // }


  initListener() {
      document.body.addEventListener('click', () => this.reset());
  }

  reset() {
    this.lastAction = Date.now();
  }

  initInterval() {
   this.clearTimeInterval = setInterval(() => {
      this.check();
    }, this.CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout && this.dataService.loggedIn()) {
     this.utilityService.showInfoToast('Sorry your session has expired!', 'Session Expired');
     this.dataService.logout();
    }
  }

  ngOnDestroy() {
   clearInterval(this.clearTimeInterval);
  }

  onDeactivate() {
    window.scrollTo(0, 0);

  }
}
