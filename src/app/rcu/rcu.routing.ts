import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'loan-collection',
      loadChildren: './loan-collection/loan-collection.module#LoanCollectionModule'
    },
    {
      path: 'loan-monitoring',
      loadChildren: './loan-monitoring/loan-monitoring.module#LoanMonitoringModule'
    },
    {
      path: 'reports',
      loadChildren: './rcu-reports/rcu-reports.module#RCUReportsModule'
    }
  ])],

  exports: [RouterModule]
})
export class RCURoutingModule { }

