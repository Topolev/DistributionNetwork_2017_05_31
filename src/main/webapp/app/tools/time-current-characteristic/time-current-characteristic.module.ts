import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TimeCurrentCharacteristicComponent} from './time-current-characteristic.component';
import {CoordinatePanelComponent} from './coordinat-panel/coordinate-panel.component';
import {CharacteristicComponent} from './modals/characteristic.component';
import {CharacteristicService} from './services/characteristic.service';
import {FuseCatalogComponent} from './fuse-catalog.component';
import {SwitcherCatalogComponent} from './switcher-catalog.component';
import {WorkspaceComponent} from './workspace.component';
import {FuseService} from './services/fuse.service';
import {SwitcherService} from './services/switcher.service';
import {FuseTemplateComponent} from './modals/fuse-template.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        WorkspaceComponent,
        FuseCatalogComponent,
        FuseTemplateComponent,
        SwitcherCatalogComponent,
        TimeCurrentCharacteristicComponent,
        CoordinatePanelComponent,
        CharacteristicComponent
    ],
    entryComponents: [
        WorkspaceComponent,
        SwitcherCatalogComponent,
        FuseCatalogComponent,
        FuseTemplateComponent,
        TimeCurrentCharacteristicComponent,
        CoordinatePanelComponent,
        CharacteristicComponent
    ],
    providers: [CharacteristicService, FuseService, SwitcherService]
})
export class TimeCurrentCharacteristicModule {
}
