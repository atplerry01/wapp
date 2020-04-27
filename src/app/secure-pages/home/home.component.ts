import {
Component,
  // ElementRef,
  // NgZone,
  OnInit
} from '@angular/core';
// import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
import { IBirthday, IFavouriteLinks, ISlides, ITop6Links, ITopSideLinks, IVideo } from '../../shared/my-interfaces';
import { DataService } from '../../shared/service/data.service';
import { UtilityService } from '../../shared/service/utility.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // recentReviews: IReview[];

  //  @ViewChild('searchTerm') public searchElementRef: ElementRef;
  birthdays: IBirthday[] = [];
  video: IVideo;
  slides: ISlides[] = [];
  top6Links: ITop6Links[] = [];
  topSideLinks: ITopSideLinks[] = [];
  favouriteLinks: IFavouriteLinks[] = [];
  FavIsInprogress = false;
  isInprogress = false;

  showDeclarationForm = false;
  currentUser: any;
  currentdate: any;

  showCodeOfConduct = false;

  showModelLink = false;
  showAttestationForm = false;
  attestationgrades = environment.attestationgrades;

  constructor(
    private dataService: DataService,
    // private router: Router,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {

    this.utilityService.setIsInprogressBS(true);
    this.utilityService.ChangeIsHome(true);

    // this.checkConfidentialityDeclaration();
    this.checkCodeOfConductDeclaration();

    this.getTop6LinksLocally();
    this.getSideLinksLocally();
    this.getSlidesLocally();
    this.getVideoLocally();

    this.getfavouritelinks();
    this.getTodayBirthDays();

  }

  isToday(endDate: string) {
    const dt = new Date();
    return dt.toJSON().split('T')[0] === endDate;
  }

  getTodayBirthDays(): void {
    const tdBday = this.dataService.getStoredTempData('todaybirthdaysv1');
    if (!!tdBday) {
      this.birthdays = JSON.parse(tdBday);
      return;
    }

    this.dataService.Get('getTodayBirthay_Staff').subscribe(
      res => {
        this.birthdays = res;
        this.dataService.StoreTempData('todaybirthdaysv1', JSON.stringify(this.birthdays));
      },
      error => {
        // console.log('todaybirthdays error:', error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }



  checkConfidentialityDeclaration() {
    console.log('***checkConfidentialityDeclaration');
    console.log(this.dataService.getStoredData('xyz1234xy_agreements'));

    if (this.dataService.getStoredData('xyz1234xy_agreements') === '1') {
      return;
    }
    this.currentUser = this.dataService.getCurrentUser();

    const dt = new Date();
    const day = dt.getDate();
    const year = dt.getFullYear();
    const month = this.utilityService.getCurrentMonth();
    this.currentdate = { day, year, month };

    this.dataService.Get('checkConfidentialityDeclaration').subscribe(
      res => {

        console.log('===> ', res);

        if (res !== 1) {
          this.showDeclarationForm = true;
        }
      },
      error => {
        this.showDeclarationForm = true;
      });
  }

  acceptConfidentialityDeclaration() {
    this.isInprogress = true;
    this.dataService.Post('', 'acceptConfidentialityDeclaration').subscribe(
      res => {
        if (res === 1) {
          this.dataService.StoreData('xyz1234xy_agreements', '1');
          this.utilityService.showSuccessToast('Thank you.', 'Success');
          this.showDeclarationForm = false;
        }

        this.isInprogress = false;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      });
  }


  checkCodeOfConductDeclaration() {

    if (this.dataService.getStoredData('xyz1234xy_codeOfConductAgreements') === '1') {
      return;
    }

    this.currentUser = this.dataService.getCurrentUser();

    const dt = new Date();
    const day = dt.getDate();
    const year = dt.getFullYear();
    const month = this.utilityService.getCurrentMonth();
    this.currentdate = { day, year, month };

    this.dataService.Get('checkCodeOfConductDeclaration').subscribe(
      res => {

        console.log('===> ', res);

        if (res !== 1) {
          this.showCodeOfConduct = true;
        }
      },
      error => {
        this.showCodeOfConduct = true;
      });
  }

  acceptCodeOfConductDeclaration() {
    this.isInprogress = true;
    this.dataService.Post('', 'acceptCodeOfConductDeclaration').subscribe(
      res => {
        console.log(res);

        if (res === 1) {
          this.dataService.StoreData('xyz1234xy_codeOfConductAgreements', '1');
          this.utilityService.showSuccessToast('Thank you.', 'Success');
          this.showCodeOfConduct = false;
        }

        this.isInprogress = false;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      });
  }

  getfavouritelinks(): void {
    if (!!this.dataService.getStoredTempData('xyz123xyz_favouriteLinks')) {
      this.favouriteLinks = JSON.parse(this.dataService.getStoredTempData('xyz123xyz_favouriteLinks'));
      return;
    }

    this.dataService.Get('getfavouritelinks').subscribe(
      res => {

        this.favouriteLinks = res;
        if (this.favouriteLinks.length) {

          // console.log('favouriteLinks:', this.favouriteLinks);

          this.FavIsInprogress = false;
          this.dataService.StoreTempData('xyz123xyz_favouriteLinks', JSON.stringify(this.favouriteLinks));
        }
      },
      error => {
        // console.log('todaybirthdays error:', error);
        this.FavIsInprogress = false;
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      });
  }

  goto(internal: string, linkid: string, link: string) {
    if (linkid === 'EMPLOYEE SELF SERVICE') {
      this.checkAttestation();
      // this.showModelLink = true;
    } else {
      this.utilityService.goto(internal, linkid, link);
    }
  }

  closeShowModelLink() {
    this.showModelLink = false;
  }


  onBirthdaySelected(bday) {
    // console.log('bday:', bday);
    this.dataService.StoreTempData('selectedBirthday', JSON.stringify(bday));
    this.utilityService.navigate('/sc/home/events/1');
  }

  birthdayPopup($event) {
    //  alert('show birth modal for sending email');
    this.utilityService.navigate('sc/home/events');
  }

  getVideoLocally() {
    if (!!this.dataService.getStoredTempData('xyz123xyz_video')) {
      this.video = JSON.parse(this.dataService.getStoredTempData('xyz123xyz_video'));
      return;
    }

    this.dataService.Get_JSON('assets/video/video.json').subscribe(
      res => {
        this.video = res;
        this.dataService.StoreTempData('xyz123xyz_video', JSON.stringify(this.video));
      },
      error => {
        console.log('loading news error:', error);
      }
    );
  }

  getSlidesLocally() {
    if (!!this.dataService.getStoredTempData('xyz123xyz_homeslides')) {
      this.slides = JSON.parse(this.dataService.getStoredTempData('xyz123xyz_homeslides'));
      return;
    }

    this.dataService.Get_JSON('assets/slides/home/slide.json').subscribe(
      res => {
        this.slides = res;
        this.slides.sort(this.utilityService.compareValues('order'));
        this.dataService.StoreTempData('xyz123xyz_homeslides', JSON.stringify(this.slides));
      },
      error => {
        console.log('loading news error:', error);
      }
    );
  }

  getTop6LinksLocally() {
    if (!!this.dataService.getStoredTempData('xyz123xyz_top6LinksLocally')) {
      this.top6Links = JSON.parse(this.dataService.getStoredTempData('xyz123xyz_top6LinksLocally'));
      return;
    }

    this.dataService.Get_JSON('assets/images/home_links.json').subscribe(
      res => {
        this.top6Links = res;
        this.top6Links.sort(this.utilityService.compareValues('order'));
        this.dataService.StoreTempData('xyz123xyz_top6LinksLocally', JSON.stringify(this.top6Links));
      },
      error => {
        console.log('loading news error:', error);
      }
    );
  }

  getSideLinksLocally() {
    if (!!this.dataService.getStoredTempData('xyz123xyz_home_side_linksLocally')) {
      this.topSideLinks = JSON.parse(this.dataService.getStoredTempData('xyz123xyz_home_side_linksLocally'));
      return;
    }

    this.dataService.Get_JSON('assets/images/home_side_links.json').subscribe(
      res => {
        this.topSideLinks = res;
        this.topSideLinks.sort(this.utilityService.compareValues('order'));
        this.dataService.StoreTempData('xyz123xyz_home_side_linksLocally', JSON.stringify(this.topSideLinks));
      },
      error => {
        console.log('loading news error:', error);
      }
    );
  }


  getAttestationToStore(staffId: string) {
    const dt = new Date();
    return `v1attestation${staffId}${dt.getFullYear()}`;
  }

  setAttestationToStore(storedName: string) {
    this.dataService.StoreData(storedName, '1');
  }

  checkAttestation() {
    this.currentUser = this.dataService.getCurrentUser();
    const storedName = this.getAttestationToStore(this.currentUser.company);
    if (this.dataService.getStoredData(storedName) === '1') {
      this.showModelLink = true;
      return;
    }

    if (!this.attestationgrades.includes(this.currentUser.grade)) {
      this.showModelLink = true;
      return;
    }

    this.dataService.Get('checkattestation').subscribe(
      res => {
        console.log('res.resp:', res.resp);
        if (Number(res.resp) === -1) {
          this.showModelLink = true;
        } else if (Number(res.resp) === 1) {
          this.showModelLink = true;
          this.setAttestationToStore(storedName);
        } else {
          this.showAttestationForm = true;
        }
      },
      () => {
        this.showAttestationForm = true;
      });
  }

  acceptAttestation() {

    this.isInprogress = true;
    this.dataService.Post('', 'attestate').subscribe(() => {

      this.currentUser = this.dataService.getCurrentUser();
      const storedName = this.getAttestationToStore(this.currentUser.company);

      this.dataService.StoreData(storedName, '1');
      this.utilityService.showSuccessToast('Thank you.', 'Success');
      this.showAttestationForm = false;
      this.showModelLink = true;

      this.isInprogress = false;
    },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      });


  }


}



// getNewsLocally() {
//   this.dataService.Get_JSON('assets/mock/news.json')
//     .subscribe((res) => {
//       this.news = res;
//       this.dataService.StoreTempData('news', JSON.stringify(res));
//       console.log('news:', this.news);
//     },
//       error => {
//         console.log('loading news error:', error
//         );
//       });
// }
