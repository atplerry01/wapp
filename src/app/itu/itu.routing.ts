import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DowntimeComponent } from './downtime/downtime.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'downtime', component: DowntimeComponent, data: { title: 'Downtime Portal' }
    },
    {
      path: 'reports',
      loadChildren: './ITUReports/ITUReports.module#ITUReportsModule'
    },
  ])],

  exports: [RouterModule]
})
export class ITURoutingModule { }
