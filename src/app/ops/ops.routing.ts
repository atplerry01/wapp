import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    // {
    //   path: 'downtime', component: DowntimeComponent, data: { title: 'Downtime Portal' }
    // },
    {
      path: 'reports',
      loadChildren: './OPSReports/OPSReports.module#OPSReportsModule'
    },
  ])],

  exports: [RouterModule]
})
export class OPSRoutingModule { }
