import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedInGuardService } from '../shared/guard/logged-in.guard.service';
import { CreateLoanComponent, LoanStatusComponent } from './index';


@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'remita-lending-create-loan', component: CreateLoanComponent, data: { title: 'Remita Lending | Create Loan' },
      canActivate: [LoggedInGuardService]
    },

    {
      path: 'remita-lending-status', component: LoanStatusComponent, data: { title: 'Remita Lending | Status' },
      canActivate: [LoggedInGuardService]
    },

  ])],

  exports: [RouterModule]
})
export class RetailRoutingModule { }

