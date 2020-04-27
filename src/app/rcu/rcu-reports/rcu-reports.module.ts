import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoggedInGuardService } from './../../shared/guard/logged-in.guard.service';
import { PdoRecoveryComponent } from './pdo-recovery/pdo-recovery.component';
import { TermDepositComponent } from './term-deposit/term-deposit.component';

const routes: Routes = [
  {
    path: 'pdo-recovery', component: PdoRecoveryComponent, data: { title: 'PDO Recovery Report' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'term-deposit', component: TermDepositComponent, data: { title: 'MIS Term Deposit Report' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  declarations: [ PdoRecoveryComponent, TermDepositComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class RCUReportsModule {}
