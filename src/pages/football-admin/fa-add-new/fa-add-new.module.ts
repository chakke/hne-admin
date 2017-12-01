import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaAddNewPage } from './fa-add-new';
import { ComponentsModule } from "../../../components/ba-components/components.module";

@NgModule({
  declarations: [
    FaAddNewPage,
  ],
  imports: [
    IonicPageModule.forChild(FaAddNewPage),
    ComponentsModule
  ],
})
export class FaAddNewPageModule { }
