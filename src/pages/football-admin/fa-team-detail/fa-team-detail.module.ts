import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaTeamDetailPage } from './fa-team-detail';
import { ComponentsModule } from "../../../components/ba-components/components.module";

@NgModule({
  declarations: [
    FaTeamDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FaTeamDetailPage),
    ComponentsModule
  ],
})
export class FaTeamDetailPageModule { }
