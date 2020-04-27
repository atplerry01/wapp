import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ALATRoutingModule } from './alat.routing';

@NgModule({
  imports: [
    SharedModule, ALATRoutingModule
  ],
  declarations: []
})

export class ALATModule { }
