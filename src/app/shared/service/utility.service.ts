import { Location } from '@angular/common';
import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAccessLevels, IBranch } from '../my-interfaces';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  private isHomeBS = new BehaviorSubject<boolean>(false);
  isHomeBS_newValue = this.isHomeBS.asObservable();

  private showSidebarBS = new BehaviorSubject<boolean>(true);
  showSidebarBS_newValue = this.showSidebarBS.asObservable();

  private showLoginBS = new BehaviorSubject<boolean>(false);
  showLoginBS_newValue = this.showLoginBS.asObservable();

  private errosBS = new BehaviorSubject<any>(null);
  errosBS_newValue = this.errosBS.asObservable();

  private profilePixBS = new BehaviorSubject<string>(null);
  profilePixBS_newValue = this.profilePixBS.asObservable();

  // set country with flag
  private isInprogressBS = new BehaviorSubject<boolean>(false);
  isInprogressBS_newValue = this.isInprogressBS.asObservable();

  private showIsChangingCountryBS = new BehaviorSubject<boolean>(false);
  showIsChangingCountryBS_newValue = this.showIsChangingCountryBS.asObservable();

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  fullMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];


  constructor(
    private dataService: DataService,
    private router: Router,
    private location: Location,
    private toastr: ToastrService
  ) {}

  public ChangeIsHome(isHomeBS_newValue) {
    this.isHomeBS.next(isHomeBS_newValue);
  }

  public toggleSideBar(showSidebarBS_newValue) {
    this.showSidebarBS.next(showSidebarBS_newValue);
  }

  public ChangeShowLogin(showLoginBS_newValue) {
    this.showLoginBS.next(showLoginBS_newValue);
  }

  public SetLoginErrors(errosBS_newValue) {
    this.errosBS.next(errosBS_newValue);
  }

  public SetProfilePix(profilePixBS_newValue) {
    this.profilePixBS.next(profilePixBS_newValue);
  }

  public SetShowIsChangingCountry(showIsChangingCountryBS_newValue: boolean) {
    this.showIsChangingCountryBS.next(showIsChangingCountryBS_newValue);
  }

  setIsInprogressBS(isInprogressBS_newValue: boolean) {
    this.isInprogressBS.next(isInprogressBS_newValue);
  }

  getStreetViewImage(lat: string, lng: string) {
    const url = `https://maps.googleapis.com/maps/api/streetview`;
    const parmas = `?size=600x300&location=${lat},${lng}&heading=151.78&pitch=-0.76&key=AIzaSyBBHGKRvnbo7pMt5YQv5q6LbruytambIfc`;
    return `${url}${parmas}`;
  }

  getSmallDeviceSize() {
    return '(min-width: 37.5em)';
  }
  getMediumDeviceSize() {
    return '(min-width: 50em)';
  }
  getLargeDeviceSize() {
    return '(min-width: 64.375em)';
  }

  navigate(link) {
    this.router.navigate([link]);
  }

  navigateWithParam(link) {
    this.router.navigate(link);
  }

  goto(internal: string, linkid: string, link: string) {
    this.dataService.logClicks(linkid);

    if (internal === 'Y') {
      this.router.navigate([link]);
    } else {
      const win = window.open(link, '_blank');
      win.focus();
    }
  }

  goBack() {
    this.location.back();
  }

  getCurrentMonth() {
    const _dt = new Date();
    return  this.fullMonths[_dt.getMonth()];
  }



  getCurrentDate() {
    const _dt = new Date();
    return `${_dt.getDate()}-${
      this.months[_dt.getMonth()]
    }-${_dt.getFullYear()}`;
  }

  getCurrentMonthStartDate() {
    const _dt = new Date();
    return `01-${this.months[_dt.getMonth()]}-${_dt.getFullYear()}`;
  }

  getCurrentMonthEndDate() {
    // how to get the last day of the month
    const today = new Date();
    const _dt = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return `${_dt.getDate()}-${
      this.months[_dt.getMonth()]
    }-${_dt.getFullYear()}`;
  }

  getCurrentYearStartDate() {
    return `01-Jan-${new Date().getFullYear()}`;
  }

  getCurrentYearEndDate() {
    return `31-Dec-${new Date().getFullYear()}`;
  }

   isValidAccountNo(accountNo: string): Boolean {
    if (!accountNo || !Number.isInteger(Number(accountNo)) || accountNo.length !== 10) {
      this.showErrorToast('Validation Failed', 'Invalid account number');
      return false;
    }
    return true;
   }

   isValidPhoneNo(phoneNo: string): Boolean {
    if (!phoneNo || !Number.isInteger(Number(phoneNo)) || phoneNo.length !== 11) {
      this.showErrorToast('Validation Failed', 'Invalid Phone number');
      return false;
    }
    return true;
   }


  getAccessInfo(modulename) {
    if (!modulename) {
      this.goBack();
      return;
    }

    let name = 'No Access',
      desc = 'You have no access to content on this page',
      className = 'noaccess',
      key = '';

    const allaccess: IAccessLevels[] = JSON.parse(
      sessionStorage.getItem('xyz123xyz_accessLevels')
    );

    let myAccess: IAccessLevels[] = [];
    if (modulename instanceof Array) {
      modulename = modulename.map(m => m.toLowerCase());
      myAccess = allaccess.filter( x => modulename.includes(x.module.toLowerCase()));

    } else {
      myAccess = allaccess.filter(
        x => x.module.toLowerCase() === modulename.toLowerCase()
      );
    }

    if (myAccess.length > 0) {
      // check if the access exist
      key = myAccess[0].access_level;
      switch (key) {
        case 'G':
          name = 'Global Access';
          desc = 'You have unlimited access to content on this page';
          className = 'globalaccess';
          break;

        case 'R':
          name = 'Regional Access';
          desc = 'You can only access infomation which belongs to your Region';
          className = 'regionalaccess';
          break;

        case 'Z':
          name = 'Zonal Access';
          desc = 'You can only access infomation which belongs to your Zone';
          className = 'zionalaccess';
          break;

        case 'B':
          name = 'Branch Access';
          desc = 'You can only access infomation which belongs to your Branch';
          className = 'branchaccess';
          break;

          case 'C':
          name = 'Checker Access';
          desc = 'Special authorizer access';
          className = 'checkeraccess';
          break;

          case 'M':
          name = 'Initiator Access';
          desc = 'Special initiator access';
          className = 'makeraccess';
          break;

        case 'S':
          name = 'Self Access';
          desc = 'You can only access infomation assigned to your user ID';
          className = 'branchaccess';
          break;
        default:
        this.navigate('/sc/home');
      }
    }

    return {
      name: name,
      description: desc,
      myclass: className,
      key: key
    };
  }

  getBranchList(myAccess): Observable<IBranch[]> {
    const accessScode = JSON.parse(
      this.dataService.getStoredTempData('xyz123xyz_scopeLevel')
    );
    let url = '';
    switch (myAccess.key) {
      case 'G':
        url = 'getBranchList';
        break;
      case 'R':
        url = `getBranchListByRegion/${accessScode.regioncode}`;
        break;
      case 'Z':
        url = `getBranchListByZone/${accessScode.zonecode}`;
        break;
      case 'B':
      case 'S':
        return;
    }

    return this.dataService.Get(url);
  }

  showInfoToast(msg, title) {
    this.toastr.info(msg, title);
  }

  showSuccessToast(msg, title) {
    this.toastr.success(msg, title);
  }

  showWarningToast(msg, title) {
    this.toastr.warning(msg, title);
  }

  showErrorToast(msg, title) {
    this.toastr.error(msg, title);
  }

  scrollToElement(elementId: ElementRef) {
    const el = elementId.nativeElement;
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  ////////////////////////  Creating a Dynamic Sorting Function  ///////////////////////////////////
  // function for dynamic sorting
  // array is sorted by band in descending order
  // bands.sort(compareValues('band', 'desc'));
  compareValues(key, order = 'asc') {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }
}
