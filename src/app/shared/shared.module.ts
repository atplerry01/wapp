import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { ChartModule } from 'angular-highcharts';
import { SlideshowModule } from 'ng-simple-slideshow';
import { FooterComponent } from './components/footer/footer.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { MyDatepickerComponent } from './components/my-datepicker/my-datepicker.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReportTemplateComponent } from './components/report-template/report-template.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PreventCopyCutDirective } from './directives/prevent-copy-cut.directive';
import { EmpFilterPipe } from './pipes/filterEmp.pipe';









@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientJsonpModule,
    RouterModule, ChartModule, SlideshowModule,
    MatDatepickerModule, MatMomentDateModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, FormlyMatDatepickerModule,
    FormlyModule.forRoot(), FormlyMaterialModule
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    HttpClientJsonpModule, RouterModule, ChartModule, SlideshowModule,
    MatDatepickerModule, MatMomentDateModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, FormlyModule, FormlyMaterialModule, FormlyMatDatepickerModule,
    HeaderComponent, MenuComponent, SidebarComponent, FooterComponent, PaginationComponent,
    ReportTemplateComponent, FormTemplateComponent, MyDatepickerComponent, PreventCopyCutDirective,
    EmpFilterPipe
    // , TooltipModule
  ],
  declarations: [HeaderComponent, MenuComponent, SidebarComponent, FooterComponent,
    PreventCopyCutDirective, PaginationComponent, ReportTemplateComponent, FormTemplateComponent,
    MyDatepickerComponent, EmpFilterPipe] // HeaderComponent]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
      // providers: [DataService, ConfigService, ItemsService, NotificationService]
    };
  }
}
