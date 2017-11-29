import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaNewsPage } from './fa-news';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    FaNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(FaNewsPage),
    ComponentsModule
  ],
})
export class FaNewsPageModule {}
