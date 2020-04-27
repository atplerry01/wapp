import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HCMRoutingModule } from './hcm.routing';

@NgModule({
  imports: [
    SharedModule, HCMRoutingModule
  ],
  declarations: []
})

export class HCMModule { }
