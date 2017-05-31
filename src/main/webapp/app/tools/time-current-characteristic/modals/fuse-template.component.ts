import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FuseService} from "../services/fuse.service";
import {PointsTemplate} from "../coordinat-panel/classes/PointsTemplate";
@Component({
    selector: "fuse-modal",
    templateUrl: "./fuse-template.component.html"
})
export class FuseTemplateComponent {

    pointsTemplate: PointsTemplate;

    constructor(private activeModal: NgbActiveModal,
                private fuseService: FuseService) {
        this.fuseService.currentPointsTemplate$.subscribe((pointsTemplate) =>{
            this.pointsTemplate = pointsTemplate != null ? pointsTemplate : new PointsTemplate();
        });
    }

    closeModal() {
        this.activeModal.close();
    }
}
