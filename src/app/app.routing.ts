import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './security/index';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'sc', loadChildren: './secure-pages/secure-pages.module#SecurePagesModule' },
    { path: 'report', loadChildren: './report/report.module#ReportModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: 'testing', loadChildren: './test-control/test-control.module#TestControlModule' },
    { path: 'retail', loadChildren: './retail/retail.module#RetailModule' },
    { path: 'rcu', loadChildren: './rcu/rcu.module#RCUModule' },
    { path: 'ccu', loadChildren: './ccu/ccu.module#CCUModule' },
    { path: 'tbu', loadChildren: './tbu/tbu.module#TBUModule' },
    { path: 'hcm', loadChildren: './hcm/hcm.module#HCMModule' },
    { path: 'fcu', loadChildren: './fcu/fcu.module#FCUModule' },
    { path: 'cbn', loadChildren: './cbn/cbn.module#CBNModule' },
    { path: 'micr', loadChildren: './micr/micr.module#MICRModule' },
    { path: 'alat', loadChildren: './alat/alat.module#ALATModule' },
    { path: 'itu', loadChildren: './itu/itu.module#ITUModule' },
    { path: 'ops', loadChildren: './ops/ops.module#OPSModule' },

    // { path: 'auth', loadChildren: './security/security.module#SecurityModule' },
    { path: '**', redirectTo: 'signin', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
