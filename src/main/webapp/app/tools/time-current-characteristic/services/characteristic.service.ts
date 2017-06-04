import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Characteristic} from '../coordinat-panel/characteristic/Characteristic';
import {
    PointsTemplate, defaultFusePointTemplates,
    defaultSwitcherPointTemplates
} from '../coordinat-panel/classes/PointsTemplate';
import {BuilderCurves} from '../coordinat-panel/curves/BuilderCurves';
import {CurveTemplate, defaultCurveTemplates} from '../coordinat-panel/curves/CurveTemplate';

@Injectable()
export class CharacteristicService {

    private currentCharacteristic = new Subject<Characteristic>();
    private newCharacteristic = new Subject<Characteristic>();
    private builderCurves = new BuilderCurves();
    private switcherPointTemplates: PointsTemplate[] = defaultSwitcherPointTemplates;
    private curveTemplates: CurveTemplate[] = defaultCurveTemplates;

    private lockedPointsTemplates: PointsTemplate[] = [];

    currentCharacteristic$ = this.currentCharacteristic.asObservable();
    newCharacteristic$ = this.newCharacteristic.asObservable();

    private characteristics: Characteristic[] = [];
    private lastCharacteristics = new Subject<Characteristic[]>();
    public lastCharacteristics$ = this.lastCharacteristics.asObservable();

    constructor() {
        this.lastCharacteristics.next(this.characteristics);
    }

    setCurrentCharacteristic(characteristic: Characteristic) {
        this.currentCharacteristic.next(characteristic);
    }

    setNewCharacteristic(characteristic: Characteristic) {
        let isExistCharacteristic = this.isExistCharacteristic(characteristic);
        if (isExistCharacteristic) {
            this.updateCharacteristic(characteristic);
        } else {
            this.addCharacteristic(characteristic);
        }
    }

    public addCharacteristic(characteristic: Characteristic) {
        this.characteristics = this.characteristics.concat(characteristic);
        this.addLockedPointsTemplate(characteristic.pointsTemplate);
        this.lastCharacteristics.next(this.characteristics);
    }

    public updateCharacteristic(characteristic: Characteristic) {
        this.characteristics = this.characteristics.map((existCharacteristic) =>
            existCharacteristic.id === characteristic.id ?
                characteristic : existCharacteristic
        );
        this.addLockedPointsTemplate(characteristic.pointsTemplate);
        this.lastCharacteristics.next(this.characteristics);
    }

    public deleteCharacteristic(characteristic: Characteristic) {
        this.characteristics = this.characteristics.filter((existCharacteristic) => characteristic.id !== existCharacteristic.id);
        this.deleteLockedTemplate(characteristic.pointsTemplate);
        this.lastCharacteristics.next(this.characteristics);
    }

    public isExistCharacteristic(characteristic: Characteristic) {
        return this.characteristics.some((existCharacteristic) => existCharacteristic.id === characteristic.id);
    }

    addLockedPointsTemplate(pointsTemplate: PointsTemplate) {
        if (pointsTemplate) {
            this.lockedPointsTemplates.push(pointsTemplate);
        }

    }

    deleteLockedTemplate(pointsTemplate: PointsTemplate) {
        if (pointsTemplate) {
            let index = this.lockedPointsTemplates.indexOf(pointsTemplate);
            this.lockedPointsTemplates.splice(index, 1);
        }
    }

    isLockedPointsTemplate(pointsTemplate: PointsTemplate): boolean {
        return this.lockedPointsTemplates.some((currentPointsTemplate) => currentPointsTemplate === pointsTemplate);
    }
}
