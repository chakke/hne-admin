import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaTeamsPage } from './fa-teams'; 
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    FaTeamsPage,
  ],
  imports: [
    IonicPageModule.forChild(FaTeamsPage),
    ComponentsModule
  ],
})
export class FaTeamsPageModule {}
