import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'fincon-reports',
      loadChildren: './FinConReports/FinConReports.module#FinConReportsModule'
    }
  ])],

  exports: [RouterModule]
})
export class FCURoutingModule { }
