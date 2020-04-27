import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'file-manager',
      loadChildren: './FileManager/file-manager.module#FileManagerModule'
    }
  ])],

  exports: [RouterModule]
})
export class HCMRoutingModule { }
