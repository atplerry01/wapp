import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './index';
import { LoggedInGuardService } from '../shared/guard/logged-in.guard.service';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'menu', component: MenuComponent, data: { title: 'Application Menu' }
      // children: [
      //   { path: 'events', component: EventsComponent },
      //   { path: 'events/:id', component: EventsComponent }
      // ]
      , canActivate: [LoggedInGuardService]
    }

  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
