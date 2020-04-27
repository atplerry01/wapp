import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoggedInGuardService } from './../../shared/guard/logged-in.guard.service';
import { DowntimeComponent } from './downtime/downtime.component';
import { EbillsComponent } from './ebills/ebills.component';
import { NipInbranchComponent } from './nip-inbranch/nip-inbranch.component';
import { RevpayComponent } from './revpay/revpay.component';

const routes: Routes = [
  {
    path: 'down-time', component: DowntimeComponent, data: { title: 'DownTime Reports' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'revpay', component: RevpayComponent, data: { title: 'Revpay Transactions' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'nip-inbranch', component: NipInbranchComponent, data: { title: 'NIP/INBRANCH Transactions' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'ebills', component: EbillsComponent, data: { title: 'E-BILLS Transactions' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [DowntimeComponent, RevpayComponent, NipInbranchComponent, EbillsComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})

export class ITUReportsModule { }
