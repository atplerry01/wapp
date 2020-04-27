import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { InternetBankingComponent, MonthlyRiskreportComponent } from '../index';

const routes: Routes = [
  {
    path: 'monthly-report', component: MonthlyRiskreportComponent, data: { title: 'Monthly Risk Report' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'internet-banking', component: InternetBankingComponent, data: { title: 'Internet Banking Report' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  declarations: [MonthlyRiskreportComponent, InternetBankingComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})

export class AMLCFTRiskReportModule { }
