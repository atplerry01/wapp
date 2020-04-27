import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilityService } from './utility.service';
// import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private utilityService: UtilityService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = !!sessionStorage.getItem('xyz123xyz_token') ? sessionStorage.getItem('xyz123xyz_token') : '';
    // const location = !!sessionStorage.getItem('mylocation') ? sessionStorage.getItem('mylocation') : '';
    // const selectedcountry = !!localStorage.getItem('selectedcountry') ? localStorage.getItem('selectedcountry') : '';

    const newRequest = req.clone({
      // headers: req.headers.set('x-access-token', token).set('x-location', location).set('selectedcountry', selectedcountry)
      headers: req.headers.set('x-access-token', token)
    });

    // return next.handle(newRequest);

    return next.handle(newRequest).pipe(tap(
      succ => {
        // console.log('request completed successfully')
      },
      err => {
        // console.log(err);
        if (err.status === 401) {
         // console.error('You are not authenticated');
         this.utilityService.navigate('/signin');
        }
      }));

  }
}



   // if (token && !isNullOrUndefined(token)) {
    // const newRequest = req.clone({
    //   headers: req.headers.set('x-access-token', token).set('x-location', location)
      // headers: req.headers.set('Authorization',  'token here')
   // });
    // console.log('newRequest', newRequest);
   // return next.handle(newRequest);
    // } else {
    //   return next.handle(req);
    // }


// return next.handle(newRequest).pipe(tap(
//   succ => console.log('request completed successfully'),
//   err => {
//     // console.log(err);
//     if (err.status === 401) {
//       console.error('You are not authenticated');
//     }
//   }),
//   catchError(this.handleError)
// }
