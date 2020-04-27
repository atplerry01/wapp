import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'reports',
      loadChildren: './reports/TBUReports.module#TBUReportModule'
    }
  ])],

  exports: [RouterModule]
})
export class TBURoutingModule { }

