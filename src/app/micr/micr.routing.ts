import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'micr-reports', loadChildren: './micrReports/micrReports.module#MicrReportsModule'
      }
    ])
  ],

  exports: [RouterModule]
})
export class MICRRoutingModule {}
