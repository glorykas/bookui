import { NgModule } from '@angular/core';
import { MultimediaComponent } from './multimedia.component';
import {ThemeModule} from '../../../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ToasterModule} from 'angular2-toaster';

const components = [
  MultimediaComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule.forRoot(),
  ],
  declarations: [...components],
  exports: [...components],
})
export class MultimediaModule { }
