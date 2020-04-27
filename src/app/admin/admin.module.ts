import { NgModule } from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import { MenuComponent } from './index';
import { AdminRoutingModule } from './admin.routing';


@NgModule({
  imports: [
    SharedModule, AdminRoutingModule
  ],
  declarations: [
    MenuComponent
  ],
 // exports: [HomeComponent]
})

export class AdminModule { }
