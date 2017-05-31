import {PointsTemplate, defaultSwitcherPointTemplates} from '../coordinat-panel/classes/PointsTemplate';
import {Characteristic} from '../coordinat-panel/characteristic/Characteristic';
import {Curve} from '../coordinat-panel/curves/Curve';
import {Point} from '../coordinat-panel/classes/Point';
import {BuilderCurves} from '../coordinat-panel/curves/BuilderCurves';
import {CurveTemplate, defaultCurveTemplates} from '../coordinat-panel/curves/CurveTemplate';
import {PointsRelativeCurve} from '../coordinat-panel/curves/PointsRelativeCurve';

export class SwitcherService {
    private switcherPointTemplates: PointsTemplate[] = defaultSwitcherPointTemplates;
    private builderCurves = new BuilderCurves();
    private curveTemplates: CurveTemplate[] = defaultCurveTemplates;

    public getSwitcherPointTemplates(): PointsTemplate[] {
        return this.switcherPointTemplates;
    }

    public buildSwitcherCharacteristic(pointsTemplate: PointsTemplate, characteristic: Characteristic) {
        if (pointsTemplate != null) {
            let curve: Curve = this.builderCurves.buildCurveByTemplate(this.curveTemplates[1]);
            (<PointsRelativeCurve> curve).points = pointsTemplate.points.map((point) => new Point(point.x, point.y));
            characteristic.curves = [curve];
        } else {
            characteristic.curves = [];
        }
    }
}
