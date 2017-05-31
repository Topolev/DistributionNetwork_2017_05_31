import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Characteristic} from "../coordinat-panel/characteristic/Characteristic";
import {
    PointsTemplate, defaultFusePointTemplates,
    defaultSwitcherPointTemplates
} from "../coordinat-panel/classes/PointsTemplate";
import {Curve} from "../coordinat-panel/curves/Curve";
import {BuilderCurves} from "../coordinat-panel/curves/BuilderCurves";
import {CurveTemplate, defaultCurveTemplates} from "../coordinat-panel/curves/CurveTemplate";
import {Point} from "../coordinat-panel/classes/Point";
import {PointsAbsCurve} from "../coordinat-panel/curves/PointsAbsCurve";
import {PointsRelativeCurve} from "../coordinat-panel/curves/PointsRelativeCurve";


@Injectable()
export class CharacteristicService {

    private currentCharacteristic = new Subject<Characteristic>();
    private newCharacteristic = new Subject<Characteristic>();
    private builderCurves = new BuilderCurves();
    private fusePointTemplates: PointsTemplate[] = defaultFusePointTemplates;
    private switcherPointTemplates: PointsTemplate[] = defaultSwitcherPointTemplates;
    private curveTemplates:  CurveTemplate[] = defaultCurveTemplates;

    currentCharacteristic$ = this.currentCharacteristic.asObservable();
    newCharacteristic$ = this.newCharacteristic.asObservable();

    setCurrentCharacteristic(characteristic: Characteristic) {
        this.currentCharacteristic.next(characteristic);
    }

    setNewCharacteristic(characteristic: Characteristic) {
        this.newCharacteristic.next(characteristic);
    }




    public getFusePointTemplates(): PointsTemplate[] {
        return this.fusePointTemplates;
    }

    public getSwitcherPointTemplates(): PointsTemplate[] {
        return this.switcherPointTemplates;
    }

    public buildFuseCharacteristic(pointsTemplate: PointsTemplate, characteristic: Characteristic){
        if (pointsTemplate != null) {
            let curve: Curve = this.builderCurves.buildCurveByTemplate(this.curveTemplates[0]);
            (<PointsAbsCurve> curve).points = pointsTemplate.points.map(point => new Point(point.x, point.y));
            characteristic.curves = [curve];
        } else{
            characteristic.curves = [];
        }
    }

    public buildSwitcherCharacteristic(pointsTemplate: PointsTemplate, characteristic: Characteristic){
        if (pointsTemplate != null) {
            let curve: Curve = this.builderCurves.buildCurveByTemplate(this.curveTemplates[1]);
            (<PointsRelativeCurve> curve).points = pointsTemplate.points.map(point => new Point(point.x, point.y));
            characteristic.curves = [curve];
        } else{
            characteristic.curves = [];
        }
    }
}
