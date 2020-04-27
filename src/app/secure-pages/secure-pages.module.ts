import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

// tslint:disable-next-line:max-line-length
import {
  AccountEnquiryComponent, AccStatementComponent, AuditPortalComponent, BranchAccStatementComponent,
  BranchNetworkComponent, CarsbidComponent, CustomerProfilingComponent, EventsComponent, HomeComponent,
  MyAccountEnquiryComponent, StatementsComponent, WhoComponent, PanProcessorComponent, FimiFileuploadComponent
} from './index';

import { SecurePagesRoutingModule } from './secure-pages.routing';





@NgModule({
  imports: [
    SharedModule, SecurePagesRoutingModule
  ],
  declarations: [
    EventsComponent,
    HomeComponent,
    AccountEnquiryComponent,
    MyAccountEnquiryComponent,
    AccStatementComponent,
    WhoComponent,
    BranchNetworkComponent,
    CarsbidComponent,
    AuditPortalComponent,
    CustomerProfilingComponent,
    StatementsComponent,
    FimiFileuploadComponent,
    PanProcessorComponent,
    BranchAccStatementComponent
  ],
 // exports: [HomeComponent]
})

export class SecurePagesModule { }
