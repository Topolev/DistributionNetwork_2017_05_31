import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {toolsRoute} from './tools.route';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToolsComponent} from './tools.component';
import {TimeCurrentCharacteristicModule} from './time-current-characteristic/time-current-characteristic.module';

const TOOLS_STATES = [
    ...toolsRoute
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        TimeCurrentCharacteristicModule,
        RouterModule.forRoot(TOOLS_STATES, { useHash: true })
    ],
    declarations: [
        ToolsComponent
    ],
    entryComponents: [
        ToolsComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolsModule {}
