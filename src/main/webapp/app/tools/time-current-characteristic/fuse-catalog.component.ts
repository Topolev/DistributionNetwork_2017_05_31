import {Component} from '@angular/core';
import {PointsTemplate, defaultFusePointTemplates} from './coordinat-panel/classes/PointsTemplate';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FuseTemplateComponent} from './modals/fuse-template.component';
import {FuseService} from './services/fuse.service';
import {CharacteristicService} from './services/characteristic.service';

@Component({
    selector: 'fuse-catalog',
    templateUrl: './fuse-catalog.component.html',
    styleUrls: ['./workspace.component.scss', './fuse-catalog.component.scss']
})
export class FuseCatalogComponent {

    pointTemplates: PointsTemplate[] = defaultFusePointTemplates;

    constructor(private modalService: NgbModal,
                public characteristicService: CharacteristicService,
                private fuseService: FuseService) {
        this.pointTemplates = this.fuseService.getFusePointTemplates();
    }

    openModalCreateOrEditCharacteristic(pointsTemplate: PointsTemplate) {
        if (!this.characteristicService.isLockedPointsTemplate(pointsTemplate)) {
            this.modalService.open(FuseTemplateComponent, {windowClass: 'modal-create-new-graph'});
            this.fuseService.setCurrentPointsTemplate(pointsTemplate);
        }
    }

    deletePointsTemplate(pointsTemplate: PointsTemplate) {
        if (!this.characteristicService.isLockedPointsTemplate(pointsTemplate)) {
            this.fuseService.deleteFusePointTemplate(pointsTemplate);
        }
    }

    changeVisible(pointsTemplate: PointsTemplate) {
        if (!this.characteristicService.isLockedPointsTemplate(pointsTemplate)) {
            pointsTemplate.visible = !pointsTemplate.visible;
        }
        console.log('change', pointsTemplate);

    }

}
