import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Characteristic, TYPE_PROTECTION} from '../coordinat-panel/characteristic/Characteristic';
import {ConfigCoordinatePanel} from '../coordinat-panel/classes/ConfigCoordinatePanel';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {defaultVoltageSteps} from './VoltageSteps';
import {CharacteristicService} from '../services/characteristic.service';
import {BuilderCurves} from '../coordinat-panel/curves/BuilderCurves';
import {PointsTemplate} from '../coordinat-panel/classes/PointsTemplate';
import {FuseService} from '../services/fuse.service';
import {SwitcherService} from '../services/switcher.service';
import {CurveComponent} from './curve.component';

declare var jQuery: any;

@Component({
    selector: 'characteristic-modal',
    templateUrl: './characteristic.component.html',
    styleUrls: ['./characteristic.component.css']
})
export class CharacteristicComponent implements OnInit {
    /*
     @ViewChild('canvas') canvas: ElementRef;
     @ViewChild('canvasBack') canvasBack: ElementRef;
     @ViewChild('contentModal') contentModal: ElementRef;*/

    characteristic: Characteristic = new Characteristic();
    prevPointsTemplate: PointsTemplate;

    config: ConfigCoordinatePanel;
    voltageSteps: Array<{value: number}> = defaultVoltageSteps;

    typeProtection: TYPE_PROTECTION;

    constructor(private modalService: NgbModal,
                private activeModal: NgbActiveModal,
                private characteristicService: CharacteristicService,
                private fuseService: FuseService,
                private switcherService: SwitcherService) {
        characteristicService.currentCharacteristic$.subscribe(
            (characteristic) => {
                this.prevPointsTemplate = characteristic ? characteristic.pointsTemplate : null;
                this.characteristic = characteristic ? characteristic : new Characteristic(Date.now());
                this.characteristic.voltageStep = characteristic ? characteristic.voltageStep : this.voltageSteps[0].value;
            }
        );
    }

    ngOnInit(): void {
    }

    closeModal() {
        this.activeModal.close();
    }

    saveCharacteristic() {
        this.characteristicService.setNewCharacteristic(this.characteristic);
        this.characteristicService.deleteLockedTemplate(this.prevPointsTemplate);
        this.activeModal.close();
    }

    openModalCreateCurve() {
        this.modalService.open(CurveComponent);
    }

    /* private deleteStage(stage: Stage) {
     this.characteristic.stages.splice(this.characteristic.stages.indexOf(stage), 1);
     }

     private createNewStage(stage: Stage) {
     console.log('Create new stage', stage);
     this.characteristic.stages.push(stage);
     this.grid.updateAllCharacteristic([this.characteristic]);
     }

     private editExistStage(editStage: Stage) {
     var stages = this.characteristic.stages;
     for (let i in stages) {
     if (stages[i].id === editStage.id) {
     stages[i] = editStage;
     break;
     }
     }
     this.grid.updateAllCharacteristic([this.characteristic]);
     }
     */
    changeTypeProtection() {
        this.characteristic.curves = [];
    }

    buildFuseCharacteristic() {
        this.fuseService.buildFuseCharacteristic(this.characteristic.pointsTemplate, this.characteristic);
    }

    buildSwitcherCharacteristic() {
        this.switcherService.buildSwitcherCharacteristic(this.characteristic.pointsTemplate, this.characteristic);
    }

}
