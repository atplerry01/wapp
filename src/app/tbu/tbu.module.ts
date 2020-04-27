import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TBURoutingModule } from './tbu.routing';

@NgModule({
  imports: [
    SharedModule, TBURoutingModule
  ],
  declarations: [],
 // exports: [HomeComponent]
})

export class TBUModule { }
