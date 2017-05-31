import {Component} from '@angular/core';
import {PointsTemplate, defaultFusePointTemplates} from './coordinat-panel/classes/PointsTemplate';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FuseTemplateComponent} from "./modals/fuse-template.component";
import {FuseService} from "./services/fuse.service";
@Component({
    selector: 'fuse-catalog',
    templateUrl: './fuse-catalog.component.html'
})
export class FuseCatalogComponent {

    pointTemplates: PointsTemplate[] = defaultFusePointTemplates;

    constructor(private modalService: NgbModal,
                private fuseService: FuseService) {
        this.pointTemplates = this.fuseService.getFusePointTemplates();
    }

    openModalCreateOrEditCharacteristic(pointTemplate: PointsTemplate) {
        this.modalService.open(FuseTemplateComponent, {windowClass: 'modal-create-new-graph'});
        this.fuseService.setCurrentPointsTemplate(pointTemplate);
    }

    deletePointsTemplate(pointsTemplate: PointsTemplate){
        this.pointTemplates = this.pointTemplates.filter((currentPointsTemplate) => currentPointsTemplate != pointsTemplate);
    }

}
