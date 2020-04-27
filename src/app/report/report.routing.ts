import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  AccstatsComponent, PerfmgtComponent, RiskassetComponent, MaturityProfileComponent,
  FirstTimeDebitComponent, ChannelMovementComponent,
  CallOverComponent, LimitNotificationComponent,
  WemaCollectComponent, AccountIntroducerComponent, TopDepositorsComponent,
  RMDashboardComponent, FixedDepositComponent, CarsbidsComponent, BetPerformanceComponent,
  AuditReportComponent, FimiReportComponent, ConfidentialComponent, AttestationReportComponent
} from './index';
import { LoggedInGuardService } from '../shared/guard/logged-in.guard.service';


@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'accstats', component: AccstatsComponent, data: { title: 'Account Statistics' }
      // children: [
      //   { path: 'events', component: EventsComponent },
      //   { path: 'events/:id', component: EventsComponent }
      // ]
      , canActivate: [LoggedInGuardService]
    },
    {
      path: 'perfmgt', component: PerfmgtComponent, data: { title: 'Account Performance Management' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'riskasset', component: RiskassetComponent, data: { title: 'Risk Asset' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'maturityprofile', component: MaturityProfileComponent, data: { title: 'Maturity Profile' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'firsttimedebit', component: FirstTimeDebitComponent, data: { title: 'First Time Debit' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'dailymovement', component: ChannelMovementComponent, data: { title: 'Daily Movement' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'callover', component: CallOverComponent, data: { title: 'Call Over' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'limitnotification', component: LimitNotificationComponent, data: { title: 'Limit Notification' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'wemacollect', component: WemaCollectComponent, data: { title: 'Wema Collect Report' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'accintroducers', component: AccountIntroducerComponent, data: { title: 'Account Introducer Report' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'topdepositors', component: TopDepositorsComponent, data: { title: 'Top Depositors Report' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'rmdashboard', component: RMDashboardComponent, data: { title: `Relationship Managers' Report` },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'fixeddeposit', component: FixedDepositComponent, data: { title: `Fixed Deposit Report` },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'assetbid', component: CarsbidsComponent, data: { title: `Asset Disposal Bids Report` },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'bet-performance', component: BetPerformanceComponent, data: { title: `Bet Performance Report` },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'audit', component: AuditReportComponent, data: { title: `Audit Report` },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'fimi', component: FimiReportComponent, data: { title: `Fimi Transactions` },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'confidentiality', component: ConfidentialComponent, data: { title: `Confidentiality Report` },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'attestationreport', component: AttestationReportComponent, data: { title: `Employee Attestation Report` },
      canActivate: [LoggedInGuardService]
    }


  ])],
  exports: [RouterModule]
})
export class ReportRoutingModule { }


