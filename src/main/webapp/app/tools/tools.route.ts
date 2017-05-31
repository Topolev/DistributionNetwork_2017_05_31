import {ToolsComponent} from './tools.component';
import {Routes} from '@angular/router';
import {TimeCurrentCharacteristicComponent} from './time-current-characteristic/time-current-characteristic.component';

export const toolsRoute: Routes = [
    {
        path: 'tools',
        component: ToolsComponent,
        data: {
            authorities: [],
            pageTitle: 'distributionNetworkApp.tools.home.title'
        }
    },
    {
        path: 'tools/test',
        component: TimeCurrentCharacteristicComponent,
        data: {
            authorities: [],
            pageTitle: 'distributionNetworkApp.tools.home.title'
        }
    }
];
