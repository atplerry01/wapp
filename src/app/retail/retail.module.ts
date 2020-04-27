import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CreateLoanComponent, LoanStatusComponent } from './index';
import { RetailRoutingModule } from './retail.routing';






@NgModule({
  imports: [
    SharedModule, RetailRoutingModule
  ],
  declarations: [
    CreateLoanComponent,
    LoanStatusComponent
  ],
 // exports: [HomeComponent]
})

export class RetailModule { }
