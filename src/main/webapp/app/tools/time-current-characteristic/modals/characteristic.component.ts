
import {Component, AfterViewInit, OnInit} from "@angular/core";
import {Characteristic, TYPE_PROTECTION} from "../coordinat-panel/characteristic/Characteristic";
import {ConfigCoordinatePanel} from "../coordinat-panel/classes/ConfigCoordinatePanel";
import {NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {defaultVoltageSteps} from "./VoltageSteps";
import {CharacteristicService} from "./characteristic.service";
import {BuilderCurves} from "../coordinat-panel/curves/BuilderCurves";
import {PointsTemplate} from "../coordinat-panel/classes/PointsTemplate";

declare var jQuery: any;



@Component({
  selector: 'characteristic-modal',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.css']
})
export class CharacteristicComponent implements  OnInit {


  /*
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvasBack') canvasBack: ElementRef;
  @ViewChild("contentModal") contentModal: ElementRef;*/

  characteristic: Characteristic = new Characteristic();
  pointsTemplate: PointsTemplate = null;

  builderCurves: BuilderCurves = new BuilderCurves();


  config: ConfigCoordinatePanel;
  isEditMode: boolean;
  voltageSteps: Array<{value: number}> = defaultVoltageSteps;

  typeProtection: TYPE_PROTECTION;


  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private characteristicService: CharacteristicService) {
    characteristicService.currentCharacteristic$.subscribe(
      characteristic => {
        this.characteristic = characteristic ? characteristic : new Characteristic(Date.now());
        this.characteristic.voltageStep = characteristic ? characteristic.voltageStep : this.voltageSteps[0].value;
      }
    )
  }

    ngOnInit(): void {
    }


  closeModal() {
    this.activeModal.close();
  }

  saveCharacteristic() {
    this.characteristicService.setNewCharacteristic(this.characteristic);
    this.activeModal.close();
  }



 /* private deleteStage(stage: Stage) {
    this.characteristic.stages.splice(this.characteristic.stages.indexOf(stage), 1);
  }

  private createNewStage(stage: Stage) {
    console.log("Create new stage", stage);
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
  changeTypeProtection(){
    this.characteristic.curves = [];
    //this.selectedFusePointsTemplate = null;
    //this.selectedSwitcherPointsTemplate = null;
  }



  buildFuseCharacteristic(){
      this.characteristicService.buildFuseCharacteristic(this.characteristic.pointsTemplate, this.characteristic);
  }


  buildSwitcherCharacteristic(){
      this.characteristicService.buildSwitcherCharacteristic(this.characteristic.pointsTemplate, this.characteristic);
  }

}
