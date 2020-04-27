import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// import { catchError, map, tap } from 'rxjs/operators';
// import { ErrorObservable } from 'rxjs/observable/errorObservable';
// import { _throw } from 'rxjs/observable/throw';

// import { tokenNotExpired } from 'angular2-jwt'; // https://github.com/auth0/angular2-jwt


@Injectable({ providedIn: 'root', })
export class DataService {

  _baseUrl: string = environment.baseUrl;
  _AspbaseUrl = environment.AspbaseUrl;
  authToken: any;

  private isLoginBS = new BehaviorSubject<boolean>(false);
  isLoginBS_newValue = this.isLoginBS.asObservable();

  private userBS = new BehaviorSubject<any>(null);
  userBS_newValue = this.userBS.asObservable();

  constructor(private http: HttpClient, public router: Router) {
  }

  PostFiles(fileToUpload: any, url: string): Observable<any> {
    const input = new FormData();
    input.append('attachment', fileToUpload);

    console.log(this._baseUrl + url);
    
    return this.http.post(this._baseUrl + url, input)
      .pipe(
        catchError(this.handleError)
      );
  }

  PostExtFiles(fileToUpload: any, url: string): Observable<any> {
    const input = new FormData();
    input.append('file', fileToUpload);

    console.log('=====> ')
    return this.http.post(url, input)
      .pipe(
        catchError(this.handleError)
      );
  }

  Post(param: any, url: string): Observable<any> {
    return this.http.post(this._baseUrl + url, param)
      .pipe(
        catchError(this.handleError)
      );
  }

  Put(param: any, url: string): Observable<any> {
    return this.http.put(this._baseUrl + url, param)
      .pipe(
        catchError(this.handleError)
      );
  }

  Get(url: string): Observable<any> {
    return this.http.get(this._baseUrl + url)
      .pipe(
        catchError(this.handleError)
      );
  }

  Delete(url: string): Observable<any> {
    return this.http.delete(this._baseUrl + url)
      .pipe(
        catchError(this.handleError)
      );
  }


  Get_JSON(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  Post_ASP(param: any, url: string): Observable<any> {
    return this.http.post(this._AspbaseUrl + url, param)
      .pipe(
        catchError(this.handleError)
      );
  }

  Post_JSON(param: any, url: string): Observable<any> {
    return this.http.post(url, param)
      .pipe(
        catchError(this.handleError)
      );
  }




  logout() {

    this.Post({}, 'users/logout').subscribe( () => {
        console.log('log out successful');
    }, () => {
      console.log('log out failed');
    }, () => {
       // this.onAuthChange$.next(null);
      sessionStorage.removeItem('xyz123xyz_token');
      sessionStorage.removeItem('xyz123xyz_user');
      sessionStorage.removeItem('xyz123xyz_menu');
      sessionStorage.removeItem('selectedBirthday');
      sessionStorage.removeItem('xyz123xyz_scopeLevel');
      sessionStorage.removeItem('xyz123xyz_accessLevels');
      sessionStorage.removeItem('xyz123xyz_video');
      sessionStorage.removeItem('xyz123xyz_favouriteLinks');
      sessionStorage.removeItem('xyz123xyz_top6LinksLocally');

      localStorage.removeItem('totalgrade');
      localStorage.removeItem('todaybirthdays');
      localStorage.removeItem('employees');
      localStorage.removeItem('getBranchList');
      localStorage.removeItem('getRegionList');
      localStorage.removeItem('getZoneList');

      this.authToken = null;
      this.isLoginBS.next(false);
      this.userBS.next(null);

      this.router.navigate(['/signin']);
    });

  }

  loggedIn() {
    return !!this.getStoredTempData('xyz123xyz_token');
  }

  removeLocalStorage(name: string) {
    localStorage.removeItem(name);
  }

  removeSessionStorage(name: string) {
    sessionStorage.removeItem(name);
  }

  storeUserData(token, user, menu, scopeLevel, accessLevels) {
    this.StoreTempData('xyz123xyz_token', token);
    this.StoreTempData('xyz123xyz_user', JSON.stringify(user));
    this.StoreTempData('xyz123xyz_menu', JSON.stringify(menu));
    this.StoreTempData('xyz123xyz_scopeLevel', JSON.stringify(scopeLevel));
    this.StoreTempData('xyz123xyz_accessLevels', JSON.stringify(accessLevels));

    this.isLoginBS.next(true);
    this.userBS.next(user);
  }

  StoreData(name, data) {
    localStorage.setItem(name, data);
  }

  getStoredData(name) {
    return localStorage.getItem(name);
  }

  StoreTempData(name, data) {
    sessionStorage.setItem(name, data);
  }

  getStoredTempData(name) {
    return sessionStorage.getItem(name);
  }

  getCurrentUser(): any {
    const userString = this.getStoredTempData('xyz123xyz_user');
    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  }


  logClicks(submenu_id: string): void {

     this.http.post(this._baseUrl + 'logUrlClick', { submenu_id }).subscribe(res => {
       console.log('completed logging.');
     });
  }

  // loadToken() {
  //   this.authToken = localStorage.getItem('xyz123xyz_token');
  // }

  // Get(url: string) {
  //   return this.http.get(url)
  //     .pipe(
  // map(res => res[0].data), // returns a {0|1} element array
  // map(res => res), // returns a {0|1} element array
  //   tap(h => {
  //     const outcome = h ? `fetched` : `did not find`;
  //    // this.log(`${outcome} hero id=${id}`);
  //    console.log(h);
  //  }),
  //     catchError(this.handleError)
  //     );
  // }


  private handleError(_error: HttpErrorResponse | any) {
    let errMsg = 'Something went wrong.';
    // console.log('original error: ', _error.error.error.message);
    if (_error && _error.error && _error.error.error && _error.error.error.message) {
      errMsg = _error.error.error.message;
    } else {
      if (_error instanceof HttpErrorResponse) {
        if (_error.status === 0) {
          errMsg = 'No network connection';
        } else {
          const body = _error.error.JSON || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${_error.status} - ${_error.statusText} ${err}`;
        }
      }
    }

    return throwError(errMsg);
  }



}
