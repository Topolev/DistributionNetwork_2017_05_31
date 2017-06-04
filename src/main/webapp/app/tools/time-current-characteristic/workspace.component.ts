import {Component} from '@angular/core';
import {ConfigCoordinatePanel, defaultConfig} from './coordinat-panel/classes/ConfigCoordinatePanel';
import {Characteristic} from './coordinat-panel/characteristic/Characteristic';
import {SectionX} from './coordinat-panel/classes/SectionX';
import {BuilderCurves} from './coordinat-panel/curves/BuilderCurves';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CharacteristicService} from './services/characteristic.service';
import {CharacteristicComponent} from './modals/characteristic.component';
import {defaultVoltageSteps} from './modals/VoltageSteps';
@Component({
    selector: 'workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
    configPanel: ConfigCoordinatePanel;
    currentVoltage: number = null;
    voltageSteps: Array<{value: number}> = defaultVoltageSteps;

    characteristics: Array<Characteristic> = [];
    sectionsX: Array<SectionX> = [];

    description = [];

    builder: BuilderCurves = new BuilderCurves();

    constructor(private modalService: NgbModal,
                private characteristicService: CharacteristicService) {
        this.configPanel = defaultConfig;

        this.characteristicService.lastCharacteristics$.subscribe(
            (characteristics) => {
                this.characteristics = characteristics;
            }
        );
    }

    showdescription(index) {
        this.description[index] = !!!this.description[index];
        console.log(this.description);
    }

    changeVisible(characteristic: Characteristic) {
        characteristic.visable = !characteristic.visable;
        this.characteristicService.updateCharacteristic(characteristic);
    }

    addSectionX() {
        this.sectionsX = this.sectionsX.concat(new SectionX());
    }

    deleteSectionX(sectionX: SectionX) {
        this.sectionsX = this.sectionsX.filter((x) => x !== sectionX);
    }

    changeSectionX() {
        this.sectionsX = this.sectionsX.concat();
    }

    openModalCreateOrEditCharacteristic(characteristic: Characteristic) {
        this.modalService.open(CharacteristicComponent, {windowClass: 'modal-create-new-graph'});
        this.characteristicService.setCurrentCharacteristic(characteristic);
    }

    changeConfig() {
        console.log('ewwe');
        let test = this.configPanel;
        this.configPanel = Object.assign({}, this.configPanel);
        console.log(test === this.configPanel);
    }
}
