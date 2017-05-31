import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { DistributionNetwork20170530SharedModule, UserRouteAccessService } from './shared';
import { DistributionNetwork20170530HomeModule } from './home/home.module';
import { DistributionNetwork20170530AdminModule } from './admin/admin.module';
import { DistributionNetwork20170530AccountModule } from './account/account.module';
import { DistributionNetwork20170530EntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {ToolsModule} from './tools/tools.module';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        DistributionNetwork20170530SharedModule,
        DistributionNetwork20170530HomeModule,
        DistributionNetwork20170530AdminModule,
        DistributionNetwork20170530AccountModule,
        DistributionNetwork20170530EntityModule,
        ToolsModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class DistributionNetwork20170530AppModule {}
