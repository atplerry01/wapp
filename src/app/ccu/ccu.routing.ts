import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'cnb-risk',
      loadChildren: './AMLCFTRiskReport/AMLCFTRiskReport.module#AMLCFTRiskReportModule'
    },
    {
      path: 'control-reports',
      loadChildren: './ControlReports/ControlReports.module#ControlReportsModule'
    }
  ])],

  exports: [RouterModule]
})
export class CCURoutingModule { }
