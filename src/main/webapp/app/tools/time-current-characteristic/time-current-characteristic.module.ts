import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TimeCurrentCharacteristicComponent} from './time-current-characteristic.component';
import {CoordinatePanelComponent} from "./coordinat-panel/coordinate-panel.component";
import {CharacteristicComponent} from "./modals/characteristic.component";
import {CharacteristicService} from "./modals/characteristic.service";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        TimeCurrentCharacteristicComponent,
        CoordinatePanelComponent,
        CharacteristicComponent
    ],
    entryComponents: [
        TimeCurrentCharacteristicComponent,
        CoordinatePanelComponent,
        CharacteristicComponent
    ],
    providers: [CharacteristicService]
})
export class TimeCurrentCharacteristicModule {}
