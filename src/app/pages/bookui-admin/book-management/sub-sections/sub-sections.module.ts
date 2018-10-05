import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubSectionsComponent } from './sub-sections.component';
import {ThemeModule} from '../../../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ToasterModule} from 'angular2-toaster';

const components = [
  SubSectionsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule.forRoot(),
  ],
  declarations: [...components],
  exports: [...components],
})
export class SubSectionsModule { }
