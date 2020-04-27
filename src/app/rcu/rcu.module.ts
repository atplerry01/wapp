import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RCURoutingModule } from './rcu.routing';



@NgModule({
  imports: [
    SharedModule, RCURoutingModule
  ],
  declarations: [
  ],
 // exports: [HomeComponent]
})

export class RCUModule { }
