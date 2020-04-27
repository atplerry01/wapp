import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { TopDepositorsComponent } from '../index';
import { FxBlotterComponent } from './fx-blotter/fx-blotter.component';
import { UnrealizedTransactionsComponent } from './unrealized-transactions/unrealized-transactions.component';

const routes: Routes = [
  {
    path: 'top-depositors', component: TopDepositorsComponent, data: { title: 'Top Depositors' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'fx-blotters', component: FxBlotterComponent, data: { title: 'FX Blotters' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'unrealized-transactions', component: UnrealizedTransactionsComponent, data: { title: 'Unrealized Transactions' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  declarations: [TopDepositorsComponent, UnrealizedTransactionsComponent,FxBlotterComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class TBUReportModule { }
