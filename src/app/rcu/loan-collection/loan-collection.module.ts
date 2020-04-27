import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { FieldCollectorComponent, FollowupManagerComponent, TeleCollectorComponent, TeleManagerComponent } from '../index';

const routes: Routes = [
    {
        path: 'followup-manager', component: FollowupManagerComponent, data: { title: 'FollowUp Manager' },
        canActivate: [LoggedInGuardService]
      },
      {
        path: 'tele-manager', component: TeleManagerComponent, data: { title: 'Tele Manager' },
        canActivate: [LoggedInGuardService]
      },
      {
        path: 'tele-collector', component: TeleCollectorComponent, data: { title: 'Tele Collector' },
        canActivate: [LoggedInGuardService]
      },
      {
        path: 'field-collector', component: FieldCollectorComponent, data: { title: 'Field Manager' },
        canActivate: [LoggedInGuardService]
      }
];

@NgModule({
  declarations: [FollowupManagerComponent, TeleManagerComponent, TeleCollectorComponent, FieldCollectorComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class LoanCollectionModule {}
