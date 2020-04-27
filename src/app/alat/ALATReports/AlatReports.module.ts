import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { FreezeAccountComponent } from './freeze-account/freeze-account.component';
import { LienAccountComponent } from './lien-account/lien-account.component';
import { RegulatoryLimitComponent } from './regulatory-limit/regulatory-limit.component';
import { RestrictedAccountComponent } from './restricted-account/restricted-account.component';

const routes: Routes = [
  {
    path: 'regulatory-limit', component: RegulatoryLimitComponent, data: { title: 'Account Mandate' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'restricted-account', component: RestrictedAccountComponent, data: { title: 'Account Mandate' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'freeze-account', component: FreezeAccountComponent, data: { title: 'Freeze Account Mandate' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'lien-account', component: LienAccountComponent, data: { title: 'Lien Account Mandate' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [RegulatoryLimitComponent, RestrictedAccountComponent, FreezeAccountComponent, LienAccountComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})

export class ALATReportsModule { }
