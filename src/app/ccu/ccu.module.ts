import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CCURoutingModule } from './ccu.routing';

@NgModule({
  imports: [
    SharedModule, CCURoutingModule
  ],
  declarations: []
})

export class CCUModule { }
