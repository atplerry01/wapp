import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuardService } from '../../shared/guard/logged-in.guard.service';
import { SharedModule } from '../../shared/shared.module';
import { FileArchivistComponent } from './file-archivist/file-archivist.component';
import { FileCheckerComponent } from './file-checker/file-checker.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileRequestComponent } from './file-request/file-request.component';
import { UserArchivistComponent } from './user-archivist/user-archivist.component';

const routes: Routes = [
  {
    path: 'staff-lists', component: FileManagerComponent, data: { title: 'File Archive System' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'users', component: UserArchivistComponent, data: { title: 'Users File Archive System' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'checker', component: FileCheckerComponent, data: { title: 'Users File Archive System' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'request-lists', component: FileRequestComponent, data: { title: 'Users File Archive System' },
    canActivate: [LoggedInGuardService]
  },
  {
    path: 'file-archivist', component: FileArchivistComponent, data: { title: 'Users File Archive System' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  declarations: [FileManagerComponent, UserArchivistComponent, FileRequestComponent, FileCheckerComponent, FileArchivistComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class FileManagerModule { }
