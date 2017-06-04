import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FuseService} from '../services/fuse.service';
import {PointsTemplate} from '../coordinat-panel/classes/PointsTemplate';
import {Point} from '../coordinat-panel/classes/Point';
@Component({
    selector: 'fuse-modal',
    templateUrl: './fuse-template.component.html'
})
export class FuseTemplateComponent {

    pointsTemplate: PointsTemplate;
    isNewTemplate: boolean;

    constructor(private activeModal: NgbActiveModal,
                private fuseService: FuseService) {
        this.fuseService.currentPointsTemplate$.subscribe((pointsTemplate) => {
            this.pointsTemplate = pointsTemplate != null ? pointsTemplate : new PointsTemplate();
            this.isNewTemplate = pointsTemplate == null ? true : false;
        });
    }

    closeModal() {
        this.activeModal.close();
    }

    savePointsTemplate() {
        if (this.isNewTemplate) {
            this.fuseService.addFusePointTemplate(this.pointsTemplate);
        } else {
            this.fuseService.updatePointTemplate(this.pointsTemplate);
        }
        this.closeModal();
    }

    deletePoint(point: Point) {
        this.pointsTemplate.points = this.pointsTemplate.points.filter((currentPoint) => currentPoint !== point);
    }

    createPoint(point: Point) {
        this.pointsTemplate.points = this.pointsTemplate.points.concat(new Point());
    }
}
