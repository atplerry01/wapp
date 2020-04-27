import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggedInGuardService } from '../shared/guard/logged-in.guard.service';
// tslint:disable-next-line: max-line-length
import { AccountEnquiryComponent, AccStatementComponent, AuditPortalComponent, BranchAccStatementComponent, BranchNetworkComponent, CarsbidComponent, CustomerProfilingComponent, EventsComponent, FimiFileuploadComponent, HomeComponent, MyAccountEnquiryComponent, PanProcessorComponent, StatementsComponent, WhoComponent } from './index';




@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'home', component: HomeComponent, data: { title: 'Home' },
      children: [
        { path: 'events', component: EventsComponent },
        { path: 'events/:id', component: EventsComponent }
      ]
      , canActivate: [LoggedInGuardService]
    },
    {
      path: 'who', component: WhoComponent, data: { title: 'Who Is Who' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'branchnetwork', component: BranchNetworkComponent, data: { title: 'Branch Network' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'myaccenquiry', component: MyAccountEnquiryComponent, data: { title: 'My Account Enquiry' },
      children: [
        { path: 'accstatement', component: AccStatementComponent }
      ]
      , canActivate: [LoggedInGuardService],
      // runGuardsAndResolvers: 'always' //other options: always/paramsChange/paramsOrQueryParamsChange
    },
    {
      path: 'accenquiry', component: AccountEnquiryComponent, data: { title: 'Account Enquiry' },
      children: [
        { path: 'accstatement', component: AccStatementComponent }
      ]
      , canActivate: [LoggedInGuardService],
      // runGuardsAndResolvers: 'always' //other options: always/paramsChange/paramsOrQueryParamsChange
    },
    {
      path: 'assets-bid', component: CarsbidComponent, data: { title: 'Access Bid' }
    },
    {
      path: 'audit', component: AuditPortalComponent, data: { title: 'Audit Page' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'banking/statement-profiling', component: CustomerProfilingComponent, data: { title: 'Statement Rendition' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'banking/statement-approval', component: StatementsComponent, data: { title: 'Statement Rendition' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'portal/file-upload', component: FimiFileuploadComponent, data: { title: 'File Upload Portal' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'bank-acc-statement', component: BranchAccStatementComponent, data: { title: 'Bank Account Statement' },
      canActivate: [LoggedInGuardService]
    },
    {
      path: 'card/pan-processor', component: PanProcessorComponent, data: { title: 'PAN Processor' },
      canActivate: [LoggedInGuardService]
    }

  ])],

  exports: [RouterModule]
})
export class SecurePagesRoutingModule { }

