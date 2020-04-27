import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CBNRoutingModule } from './cbn.routing';

@NgModule({
  imports: [
    SharedModule, CBNRoutingModule
  ],
  declarations: []
})

export class CBNModule { }
