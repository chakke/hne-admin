import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaPlayerDetailPage } from './fa-player-detail';

@NgModule({
  declarations: [
    FaPlayerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FaPlayerDetailPage),
  ],
})
export class FaPlayerDetailPageModule {}
