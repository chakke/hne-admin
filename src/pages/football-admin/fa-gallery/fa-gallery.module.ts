import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaGalleryPage } from './fa-gallery';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    FaGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(FaGalleryPage),
    ComponentsModule
  ],
})
export class FaGalleryPageModule {}
