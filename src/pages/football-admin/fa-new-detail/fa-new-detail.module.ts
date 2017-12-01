import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaNewDetailPage } from './fa-new-detail';
import { ComponentsModule } from "../../../components/ba-components/components.module";

@NgModule({
  declarations: [
    FaNewDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FaNewDetailPage),
    ComponentsModule
  ],
})
export class FaNewDetailPageModule { }
