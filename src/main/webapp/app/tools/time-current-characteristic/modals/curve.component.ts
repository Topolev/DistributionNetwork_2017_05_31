import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Curve} from '../coordinat-panel/curves/Curve';
import {CurveTemplate, defaultCurveTemplates} from '../coordinat-panel/curves/CurveTemplate';
@Component({
    templateUrl: './curve.component.html'
})
export class CurveComponent {
    curve: Curve = new Curve();
    curveTemplates: CurveTemplate[] = defaultCurveTemplates;

    constructor(private activeModal: NgbActiveModal) {
    }

    closeModal() {
        this.activeModal.close();
    }

    changeCurveTemplate() {
        if (this.curve.curveTemplate) {
            console.log('sadas');
        }
    }

    saveCurve() {
    }
}
