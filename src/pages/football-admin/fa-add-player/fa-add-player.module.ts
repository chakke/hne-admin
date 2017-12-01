import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaAddPlayerPage } from './fa-add-player';
import { ComponentsModule } from "../../../components/ba-components/components.module";

@NgModule({
  declarations: [
    FaAddPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(FaAddPlayerPage),
    ComponentsModule
  ],
})
export class FaAddPlayerPageModule { }
