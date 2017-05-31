import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Characteristic} from '../coordinat-panel/characteristic/Characteristic';
import {
    PointsTemplate, defaultFusePointTemplates,
    defaultSwitcherPointTemplates
} from '../coordinat-panel/classes/PointsTemplate';
import {Curve} from '../coordinat-panel/curves/Curve';
import {BuilderCurves} from '../coordinat-panel/curves/BuilderCurves';
import {CurveTemplate, defaultCurveTemplates} from '../coordinat-panel/curves/CurveTemplate';
import {Point} from '../coordinat-panel/classes/Point';
import {PointsAbsCurve} from '../coordinat-panel/curves/PointsAbsCurve';
import {PointsRelativeCurve} from '../coordinat-panel/curves/PointsRelativeCurve';

@Injectable()
export class CharacteristicService {

    private currentCharacteristic = new Subject<Characteristic>();
    private newCharacteristic = new Subject<Characteristic>();
    private builderCurves = new BuilderCurves();
    private switcherPointTemplates: PointsTemplate[] = defaultSwitcherPointTemplates;
    private curveTemplates: CurveTemplate[] = defaultCurveTemplates;

    currentCharacteristic$ = this.currentCharacteristic.asObservable();
    newCharacteristic$ = this.newCharacteristic.asObservable();

    setCurrentCharacteristic(characteristic: Characteristic) {
        this.currentCharacteristic.next(characteristic);
    }

    setNewCharacteristic(characteristic: Characteristic) {
        this.newCharacteristic.next(characteristic);
    }

}
