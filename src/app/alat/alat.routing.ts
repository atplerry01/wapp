import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'reports',
      loadChildren: './ALATReports/AlatReports.module#ALATReportsModule'
    },
  ])],

  exports: [RouterModule]
})
export class ALATRoutingModule { }
