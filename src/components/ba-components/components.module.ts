import { NgModule } from '@angular/core';
import { BaHeaderComponent } from './ba-header/ba-header';
import { IonicPageModule } from 'ionic-angular';
import { BaTitleComponent } from './ba-title/ba-title';
import { BaProgressComponent } from './ba-progress/ba-progress';
import { BaButtonsFunctionComponent } from './ba-buttons-function/ba-buttons-function';
import { ImageSelectorComponent } from './image-selector/image-selector';
import { FaAlertComponent } from './fa-alert/fa-alert';

@NgModule({
	declarations: [
		BaHeaderComponent,
		BaTitleComponent,
		BaProgressComponent,
		BaButtonsFunctionComponent,
		ImageSelectorComponent,
		FaAlertComponent
	],
	imports: [IonicPageModule],
	exports: [
		BaHeaderComponent,
		BaTitleComponent,
		BaProgressComponent,
		BaButtonsFunctionComponent,
		ImageSelectorComponent,
		FaAlertComponent
	]
})
export class ComponentsModule { }
