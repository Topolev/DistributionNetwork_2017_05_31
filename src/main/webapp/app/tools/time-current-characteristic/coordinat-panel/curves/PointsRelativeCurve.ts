import {Curve} from './Curve';
import {Point} from '../classes/Point';
import {ConfigCoordinatePanel} from '../classes/ConfigCoordinatePanel';
import * as util from '../classes/UtilCanvas';
import {Characteristic} from '../characteristic/Characteristic';

export class PointsRelativeCurve extends Curve {
    points: Array<Point> = [];
    baseValue: number;

    constructor() {
        super();
    }

    public draw(ctx: CanvasRenderingContext2D, characteristic: Characteristic, config: ConfigCoordinatePanel) {
        let baseU = (characteristic.voltageStep && config.currentVoltage) ? config.currentVoltage / characteristic.voltageStep : 1;
        let pointPrev = this.points[0];
        for (let i = 1; i < this.points.length; i++) {
            util.drawLine(ctx,
                util.xOriginToFactLog(+pointPrev.x * this.baseValue * baseU, config), util.yOriginToFactLog(+pointPrev.y, config),
                util.xOriginToFactLog(+this.points[i].x * this.baseValue * baseU, config), util.yOriginToFactLog(+this.points[i].y, config), characteristic.color);
            pointPrev = this.points[i];
        }
    }

    public drawHorizontalLine(ctx: CanvasRenderingContext2D, characteristic: Characteristic, config: ConfigCoordinatePanel, xOrigin: number) {
        let baseU = (characteristic.voltageStep && config.currentVoltage) ? config.currentVoltage / characteristic.voltageStep : 1;
        if ((+this.points[0].x * this.baseValue * baseU < xOrigin) && (+this.points[this.points.length - 1].x * this.baseValue * baseU > xOrigin)) {
            let prevPoint = this.points[0];
            let i = 0;
            while (prevPoint.x * this.baseValue * baseU < xOrigin && i < this.points.length) {
                prevPoint = this.points[++i];
            }

            let point1Fact = new Point(util.xOriginToFactLog(this.points[i - 1].x, config), util.yOriginToFactLog(this.points[i - 1].y, config));
            let point2Fact = new Point(util.xOriginToFactLog(prevPoint.x, config), util.yOriginToFactLog(prevPoint.y, config));

            let fn = this.approximationByLine(point1Fact, point2Fact);
            let xFact = util.xOriginToFactLog(xOrigin / (this.baseValue * baseU), config);
            let yFact = fn(xFact);

            this.drawHorizontalLineFromXOriginToEndWorkspace(xOrigin, util.yFactToOriginLog(yFact, config), ctx, config);
        }
    }

    private approximationByLine(point1: Point, point2: Point): (x: number) => number {
        const x1 = +point1.x, y1 = +point1.y;
        const x2 = +point2.x, y2 = +point2.y;
        const k = (y2 - y1) / (x2 - x1);
        const b = (y1 * x2 - x1 * y2) / (x2 - x1);
        return (x) => k * x + b;
    }
}
