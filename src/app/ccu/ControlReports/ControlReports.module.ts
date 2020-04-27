import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { AccountMandateComponent } from './account-mandate/account-mandate.component';
import { AccountRactivationComponent } from './account-ractivation/account-ractivation.component';
import { CRMChangeComponent } from './crmchange/crmchange.component';
import { FixedDepositComponent } from './fixed-deposit/fixed-deposit.component';
import { PartLiquidationComponent } from './part-liquidation/part-liquidation.component';
import { RiskAssetsComponent } from './risk-assets/risk-assets.component';

const routes: Routes = [
  {
    path: 'account-mandate', component: AccountMandateComponent, data: { title: 'Account Mandate' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'account-reactivation', component: AccountRactivationComponent, data: { title: 'Account Reactivation' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'crm-change', component: CRMChangeComponent, data: { title: 'CRM Account' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'fixed-deposit', component: FixedDepositComponent, data: { title: 'Fixed Deposit' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'risk-assets', component: RiskAssetsComponent, data: { title: 'Risk Assets' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'part-liquidations', component: PartLiquidationComponent, data: { title: 'Part Liquidations Reports' },
    canActivate: [LoggedInGuardService]
  }

];

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [AccountMandateComponent, AccountRactivationComponent, CRMChangeComponent, FixedDepositComponent, RiskAssetsComponent, PartLiquidationComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})

export class ControlReportsModule { }
