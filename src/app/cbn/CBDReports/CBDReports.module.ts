import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoggedInGuardService } from './../../shared/guard/logged-in.guard.service';
import { CorporateBorrowerComponent } from './corporate-borrower/corporate-borrower.component';
import { CreditInformationComponent } from './credit-information/credit-information.component';
import { GuarantorsInformationComponent } from './guarantors-information/guarantors-information.component';
import { IndividualBorrowerComponent } from './individual-borrower/individual-borrower.component';
import { PrincipalOfficersComponent } from './principal-officers/principal-officers.component';

const routes: Routes = [
  {
    path: 'corporate-borrower',
    component: CorporateBorrowerComponent,
    data: { title: 'Corporate Borrower' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'credit-information',
    component: CreditInformationComponent,
    data: { title: 'Credit Information' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'guarantors-information',
    component: GuarantorsInformationComponent,
    data: { title: 'Guarantors Information' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'individual-borrower',
    component: IndividualBorrowerComponent,
    data: { title: 'Individual Borrower' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'principal-officers',
    component: PrincipalOfficersComponent,
    data: { title: 'Principal Officers' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],

  declarations: [
    CorporateBorrowerComponent,
    CreditInformationComponent,
    GuarantorsInformationComponent,
    IndividualBorrowerComponent,
    PrincipalOfficersComponent
  ]
})
export class CBDReportsModule {}
