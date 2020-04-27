import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { LoanReportsComponent } from './loan-reports/loan-reports.component';

const routes: Routes = [
  {
    path: 'reports', component: LoanReportsComponent, data: { title: 'Loan Monitoring Report' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  declarations: [ LoanReportsComponent ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class LoanMonitoringModule {}
