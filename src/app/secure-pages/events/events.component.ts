import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/service/data.service';
import { UtilityService } from '../../shared/service/utility.service';
import { IBirthday } from '../../shared/my-interfaces';
import { Email } from '../../shared/my-classes';
import { slideInOutAnimation } from '../../shared/index';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],


  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],

  // attach the slide in/out animation to the host (root) element of this component
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@slideInOutAnimation]': '' }
})
export class EventsComponent implements OnInit {

  showBirthdayForm = false;
  selectedBirthday: IBirthday = null;
  id: number;

  mySize = 50;
  emailModel: Email;

  birthdays: IBirthday[] = [];
  isInProgress = false;
  currentUser: any;

  constructor(private dataService: DataService, public utilityService: UtilityService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(res => {
      if (res.id) {
        // tslint:disable-next-line:radix
        this.id = parseInt(res.id);
      } else {
        this.utilityService.goBack();
      }

    });

  }

  ngOnInit() {

    // const sbd = this.dataService.getStoredTempData('selectedBirthday');

    // if (sbd) {
    //   this.selectedBirthday = JSON.parse(sbd);
    //   this.showBirthdayForm = true;
    //  // console.log('got selected birthday');
    // }

    const tdBday = this.dataService.getStoredData('todaybirthdays');
    if (!!!tdBday) {
      this.getTodayBirthDays();
    } else {
      this.birthdays = JSON.parse(tdBday);
    }

    this.currentUser = this.dataService.getCurrentUser();
    this.initializeForm();
  }

  initializeForm() {
    this.emailModel = new Email(this.currentUser.mail, 'Happy Birthday', '', '', '', this.currentUser.displayName);
  }


  getTodayBirthDays(): void {

    this.dataService.Get('getTodayBirthay_Staff')
      .subscribe((res) => {
        this.birthdays = res;
        this.dataService.StoreData('todaybirthdays', JSON.stringify(this.birthdays));
      },
        error => {
          console.log('todaybirthdays error:', error);
        });
  }

  // isToday(endDate: string) {
  //   const dt = new Date();
  //   return (dt.toJSON().split('T')[0]) === endDate;
  // }


  onBirthdaySelected(_selected: any) {
    this.selectedBirthday = _selected;
    console.log('selected birthday:', this.selectedBirthday);
    this.showBirthdayForm = true;
  }

  onSendEmail() {
    this.utilityService.showSuccessToast('Birthday message successfully sent!', 'Email Sent');

    this.emailModel.title =  this.emailModel.subject;
    this.dataService.Post(this.emailModel, 'email').subscribe(res => {
      console.log('birthday email response:', JSON.stringify(res));
    },
  error => {
    console.log('birthday email response error:', JSON.stringify(error));
  });


    this.closeBirthdayForm();
  }

  closeBirthdayForm() {
    this.showBirthdayForm = false;
    this.selectedBirthday = null;
    this.initializeForm();
  }
}
