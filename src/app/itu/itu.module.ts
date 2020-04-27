import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ITURoutingModule } from './itu.routing';
import { DowntimeComponent } from './downtime/downtime.component';

@NgModule({
  imports: [
    SharedModule, ITURoutingModule
  ],
  declarations: [DowntimeComponent]
})

export class ITUModule { }
