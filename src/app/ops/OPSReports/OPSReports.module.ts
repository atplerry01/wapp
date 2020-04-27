import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoggedInGuardService } from './../../shared/guard/logged-in.guard.service';
import { UssdTransComponent } from './ussd-trans/ussd-trans/ussd-trans.component';

const routes: Routes = [
  {
    path: 'ussd-trans', component: UssdTransComponent, data: { title: 'DownTime Reports' },
    canActivate: [LoggedInGuardService]
  },
];

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [UssdTransComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})

export class OPSReportsModule { }
