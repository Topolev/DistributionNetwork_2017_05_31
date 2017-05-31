

import {Component} from "@angular/core";
import {ConfigCoordinatePanel, defaultConfig} from "./coordinat-panel/classes/ConfigCoordinatePanel";
import {Characteristic} from "./coordinat-panel/characteristic/Characteristic";
import {SectionX} from "./coordinat-panel/classes/SectionX";
import {BuilderCurves} from "./coordinat-panel/curves/BuilderCurves";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CharacteristicService} from "./modals/characteristic.service";
import {CharacteristicComponent} from "./modals/characteristic.component";
@Component({
    selector: 'time-current-characteristic',
    templateUrl: './time-current-characteristic.component.html',
    styleUrls: ['./time-current-characteristic.component.scss']
})
export class TimeCurrentCharacteristicComponent {

    configPanel: ConfigCoordinatePanel;
    characteristics: Array<Characteristic> = [];
    sectionsX: Array<SectionX> = [];

    description = [];

    builder: BuilderCurves = new BuilderCurves();

    constructor(private modalService: NgbModal,
                private characteristicService: CharacteristicService) {
        this.configPanel = defaultConfig;
        this.characteristicService.newCharacteristic$.subscribe(
            (characteristic) => {
                this.setCharacteristic(characteristic);
            }
        );
    }

    showdescription(index) {
        this.description[index] = !!!this.description[index];
        console.log(this.description);
    }

    setCharacteristic(characteristic: Characteristic) {
        let isExistCharacrteristic = this.characteristics.some((existCharacteristic) => existCharacteristic.id === characteristic.id);
        if (isExistCharacrteristic) {
            this.characteristics.map((existCharacteristic) =>
                existCharacteristic.id === characteristic.id ?
                    characteristic : existCharacteristic
            );
            this.characteristics = this.characteristics.concat();
        } else {
            this.characteristics = this.characteristics.concat(characteristic);
        }
    }

    changeVisable(characteristic: Characteristic) {
        characteristic.visable = !characteristic.visable;
        this.updateCharacteristic();
    }

    updateCharacteristic() {
        this.characteristics = this.characteristics.concat();
    }

    deleteCharacteristic(characteristic: Characteristic) {
        this.characteristics = this.characteristics.filter((existCharacteristic) => characteristic.id !== existCharacteristic.id);
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
        /*if (characteristic != null){
         characteristic = JSON.parse(JSON.stringify(characteristic));
         }*/
        this.characteristicService.setCurrentCharacteristic(characteristic);
    }
}
