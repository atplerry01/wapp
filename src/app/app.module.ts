import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as exporting from 'highcharts/modules/exporting.src';
import { ToastrModule } from 'ngx-toastr'; // https://github.com/scttcper/ngx-toastr
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SigninComponent } from './security/index';
import { AuthInterceptorService } from './shared/service/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    ToastrModule.forRoot()
   // SlideshowModule,
  //  ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: () => [ exporting ]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// useFactory: () => [ more, exporting ]
