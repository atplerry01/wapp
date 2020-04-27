import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../../shared/service/data.service';
import { UtilityService } from '../../shared/service/utility.service';
import { ISlides } from '../../shared/my-interfaces';
import { SignIn } from '../../shared/my-classes';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isInprogress = false;
  returnUrl: string;
  signinModel: SignIn;
  @ViewChild('passField') passField: ElementRef;

  slides: ISlides[] = [];

  constructor(private utilityService: UtilityService, private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.signinModel = new SignIn('', '');

    // this.setGalleryDimensions();

    // this.deviceSize = '';
    // window.onresize = (e) => {
    //   ngZone.run(() => {

    //     console.log('innerWidth:', window.innerWidth, 'innerHeight:', window.innerHeight);

    //     this.setGalleryDimensions(window.innerWidth);
    //   });
    // };

  }


  ngOnInit() {

    this.dataService.logout();
    // get return url from route parameters or default to 'home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'sc/home';

    this.getSlidesLocally();
  }


  onSubmit(): void {
    this.isInprogress = true;

    this.dataService.Post(this.signinModel, 'users/login')
      .subscribe((res) => {
        //  console.log('login result:', res);
        this.dataService.storeUserData(res.token, res.user, res.menu, res.scopeLevel, res.accessLevels);

        this.resetForm();
        this.isInprogress = false;

        this.router.navigate([this.returnUrl]);
      },
        error => {
          // console.log(error);
          // this.errorMsg = 'Login failed. Username/password is invalid!';
          this.utilityService.showErrorToast(error, 'Login failed!');
          this.isInprogress = false;
          this.signinModel.password = '';
          this.passField.nativeElement.focus();
        });
  }

  resetForm() {
    this.signinModel.username = '';
    this.signinModel.password = '';
  }


  getSlidesLocally() {

    if (!!this.dataService.getStoredTempData('xyz123xyz_loginslides')) {
      this.slides = JSON.parse(this.dataService.getStoredTempData('xyz123xyz_loginslides'));
      return;
    }

    this.dataService.Get_JSON('assets/slides/slide.json').subscribe(
      res => {
        this.slides = res;
        this.slides.sort(this.utilityService.compareValues('order'));
        this.dataService.StoreTempData('xyz123xyz_loginslides', JSON.stringify(this.slides));
      },
      error => {
        console.log('loading news error:', error);
      }
    );
  }


  //   ngOnDestroy() {
  //     clearInterval(this.renderTimeout);
  // }

}

