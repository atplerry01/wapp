import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormComponent, ReportComponent } from './index';


@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'form', component: FormComponent, data: { title: 'Testing Form Page' }
    },
    {
      path: 'report', component: ReportComponent, data: { title: 'Testing Report Page' }
    }

  ])],
  exports: [RouterModule]
})
export class TestControlRoutingModule { }
