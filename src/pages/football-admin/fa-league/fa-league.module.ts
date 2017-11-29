import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaLeaguePage } from './fa-league';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    FaLeaguePage,
  ],
  imports: [
    IonicPageModule.forChild(FaLeaguePage),
    ComponentsModule
  ],
})
export class FaLeaguePageModule {}
