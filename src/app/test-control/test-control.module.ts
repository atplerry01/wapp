import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import { FormComponent, ReportComponent } from './index';
import { TestControlRoutingModule } from './test-control.routing';


@NgModule({
  imports: [
    SharedModule, TestControlRoutingModule
  ],
  declarations: [
    FormComponent, ReportComponent
  ],
 // exports: [HomeComponent]
})

export class TestControlModule { }
