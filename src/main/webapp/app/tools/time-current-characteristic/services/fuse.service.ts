import {PointsTemplate, defaultFusePointTemplates} from '../coordinat-panel/classes/PointsTemplate';
import {Characteristic} from '../coordinat-panel/characteristic/Characteristic';
import {Curve} from '../coordinat-panel/curves/Curve';
import {PointsAbsCurve} from '../coordinat-panel/curves/PointsAbsCurve';
import {Point} from '../coordinat-panel/classes/Point';
import {BuilderCurves} from '../coordinat-panel/curves/BuilderCurves';
import {CurveTemplate, defaultCurveTemplates} from '../coordinat-panel/curves/CurveTemplate';
import {Subject} from 'rxjs';

export class FuseService {
    private fusePointTemplates: PointsTemplate[] = defaultFusePointTemplates;
    private lockedFusePointTemplates: PointsTemplate[];

    private builderCurves = new BuilderCurves();
    private curveTemplates: CurveTemplate[] = defaultCurveTemplates;

    private currentPointsTemplate = new Subject<PointsTemplate>();
    private newPointsTemplate = new Subject<PointsTemplate>();

    currentPointsTemplate$ = this.currentPointsTemplate.asObservable();
    newPointsTemplate$ = this.newPointsTemplate.asObservable();

    setCurrentPointsTemplate(pointsTemplate: PointsTemplate) {
        this.currentPointsTemplate.next(pointsTemplate);
    }

    setNewPointsTemplate(pointsTemplate: PointsTemplate) {
        this.newPointsTemplate.next(pointsTemplate);
    }

    public getFusePointTemplates(): PointsTemplate[] {
        return this.fusePointTemplates;
    }

    public getVisiblePointTemplates(): PointsTemplate[] {
        return this.fusePointTemplates.filter((pointTemplate) => pointTemplate.visible);
    }

    public addLockedFusePointTemplate(pointsTemplate: PointsTemplate) {
        this.lockedFusePointTemplates.push(pointsTemplate);
    }

    public addFusePointTemplate(pointsTemplate: PointsTemplate) {
        this.fusePointTemplates = this.fusePointTemplates.concat(pointsTemplate);
    }

    public updatePointTemplate(pointsTemplate: PointsTemplate) {
        this.fusePointTemplates = this.fusePointTemplates.map(
            (currentPointTemplate) => currentPointTemplate === pointsTemplate ? pointsTemplate : currentPointTemplate);
    }

    public deleteFusePointTemplate(pointsTemplate: PointsTemplate) {
        this.fusePointTemplates = this.fusePointTemplates.filter((currentPointsTemplate) => currentPointsTemplate !== pointsTemplate);
    }

    public buildFuseCharacteristic(pointsTemplate: PointsTemplate, characteristic: Characteristic) {
        if (pointsTemplate != null) {
            let curve: Curve = this.builderCurves.buildCurveByTemplate(this.curveTemplates[0]);
            (<PointsAbsCurve> curve).points = pointsTemplate.points.map((point) => new Point(point.x, point.y));
            characteristic.curves = [curve];
        } else {
            characteristic.curves = [];
        }
    }
}
