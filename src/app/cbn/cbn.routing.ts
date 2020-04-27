import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cbd-reports',
        loadChildren: './CBDReports/CBDReports.module#CBDReportsModule'
      }
    ])
  ],

  exports: [RouterModule]
})
export class CBNRoutingModule {}
