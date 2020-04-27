import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { InfoShareComponent } from './info-share/info-share.component';

const routes: Routes = [
  {
    path: 'bts', component: InfoShareComponent, data: { title: 'MICR BTS Reports' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  declarations: [InfoShareComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class MicrReportsModule {}
