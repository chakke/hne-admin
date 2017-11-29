import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaUserPage } from './fa-user';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    FaUserPage,
  ],
  imports: [
    IonicPageModule.forChild(FaUserPage),
    ComponentsModule
  ],
})
export class FaUserPageModule {}
