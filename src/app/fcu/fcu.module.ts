import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FCURoutingModule } from './fcu.routing';

@NgModule({
  imports: [
    SharedModule, FCURoutingModule
  ],
  declarations: []
})

export class FCUModule { }
