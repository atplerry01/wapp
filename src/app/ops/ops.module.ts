import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OPSRoutingModule } from './ops.routing';

@NgModule({
  imports: [
    SharedModule, OPSRoutingModule
  ],
  declarations: []
})

export class OPSModule { }
